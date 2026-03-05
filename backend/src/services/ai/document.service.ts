// document.service.ts - Load PDF và chunk text (Recursive Character Splitter)
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require('pdf-parse') as (buffer: Buffer) => Promise<{ text: string; numpages: number }>;
import { getBatchEmbeddings, getEmbedding } from './embedding.service';
import { upsertChunks, type ChunkDocument } from './qdrant.service';
import { buildBM25Index } from './bm25.service';

// ─────────────────────────────────────────────
// PDF LOADER
// ─────────────────────────────────────────────

/**
 * Parse PDF buffer và trả về raw text
 */
export async function loadPDF(buffer: Buffer): Promise<string> {
    const data = await pdfParse(buffer);
    return data.text;
}

// ─────────────────────────────────────────────
// RECURSIVE CHARACTER SPLITTER
// ─────────────────────────────────────────────

const DEFAULT_SEPARATORS = ['\n\n', '\n', '. ', ', ', ' ', ''];

/**
 * Recursive Character Text Splitter
 * Tách text thành các chunk với overlap, ưu tiên tách tại separator tự nhiên
 */
export function recursiveSplit(
    text: string,
    chunkSize: number = 512,
    chunkOverlap: number = 64,
    separators: string[] = DEFAULT_SEPARATORS
): string[] {
    const chunks: string[] = [];
    _split(text, chunkSize, chunkOverlap, separators, chunks);
    return chunks.filter((c) => c.trim().length > 0);
}

function _split(
    text: string,
    chunkSize: number,
    overlap: number,
    separators: string[],
    result: string[]
): void {
    if (text.length <= chunkSize) {
        result.push(text);
        return;
    }

    // Tìm separator phù hợp
    let separator = separators[separators.length - 1]; // fallback: ''
    for (const sep of separators) {
        if (sep !== '' && text.includes(sep)) {
            separator = sep;
            break;
        }
    }

    const parts = separator ? text.split(separator) : [text];
    let current = '';

    for (const part of parts) {
        const candidate = current ? current + separator + part : part;
        if (candidate.length <= chunkSize) {
            current = candidate;
        } else {
            if (current.length > 0) {
                result.push(current);
                // Overlap: giữ lại phần cuối để context liền mạch
                const words = current.split(' ');
                const overlapWords = words.slice(-Math.ceil(overlap / 5));
                current = overlapWords.join(' ') + separator + part;
            } else {
                // phần tử đơn quá dài → đệ quy với separator tiếp theo
                const nextSeps = separators.slice(separators.indexOf(separator) + 1);
                if (nextSeps.length > 0) {
                    _split(part, chunkSize, overlap, nextSeps, result);
                } else {
                    // Force split
                    for (let i = 0; i < part.length; i += chunkSize - overlap) {
                        result.push(part.slice(i, i + chunkSize));
                    }
                }
                current = '';
            }
        }
    }

    if (current.length > 0) result.push(current);
}

// ─────────────────────────────────────────────
// INGEST PIPELINE
// ─────────────────────────────────────────────

export interface IngestResult {
    filename: string;
    chunks: number;
    characters: number;
}

// Cache danh sách chunk texts để build BM25 index
let _allChunkTexts: Array<{ id: string; text: string }> = [];

/**
 * Pipeline đầy đủ: PDF → Text → Chunks → Embeddings → Qdrant
 */
export async function ingestDocument(
    buffer: Buffer,
    filename: string,
    chunkSize: number = 512,
    chunkOverlap: number = 64
): Promise<IngestResult> {
    // 1. Load PDF
    const text = await loadPDF(buffer);

    // 2. Chunking
    const chunks = recursiveSplit(text, chunkSize, chunkOverlap);

    // 3. Embed từng chunk
    const embeddings = await getBatchEmbeddings(chunks);

    // 4. Chuẩn bị docs
    const timestamp = new Date().toISOString();
    const docs: ChunkDocument[] = chunks.map((text, i) => ({
        text,
        embedding: embeddings[i],
        metadata: {
            filename,
            chunkIndex: i,
            totalChunks: chunks.length,
            ingestedAt: timestamp,
        },
    }));

    // 5. Upsert vào Qdrant
    await upsertChunks(docs);

    // 6. Cập nhật BM25 index (append)
    const newEntries = chunks.map((text, i) => ({
        id: `${filename}_${i}`,
        text,
    }));
    _allChunkTexts = [..._allChunkTexts, ...newEntries];
    buildBM25Index(_allChunkTexts);

    return {
        filename,
        chunks: chunks.length,
        characters: text.length,
    };
}

/**
 * Lấy số lượng chunk đã index
 */
export function getIngestedCount(): number {
    return _allChunkTexts.length;
}
