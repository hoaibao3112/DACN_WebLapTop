import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { env } from './env';
import { TaiKhoan } from '../models';
import { generatePassword } from '../utils/password.util';
import { sequelize } from '../config/database';

// Google OAuth Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
            callbackURL: env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if user already exists
                let user = await TaiKhoan.findOne({
                    where: { email: profile.emails?.[0].value },
                });

                if (!user) {
                    // Create new user
                    const randomPassword = generatePassword();
                    user = await TaiKhoan.create({
                        hoten: profile.displayName,
                        email: profile.emails?.[0].value || '',
                        matkhau: randomPassword, // Will be hashed by model hook
                        sodienthoai: '',
                        trangthai: true,
                        oauth_provider: 'google',
                        oauth_id: profile.id,
                    });

                    // Assign default Customer role (vaitro_id = 3) using raw query
                    await sequelize.query(
                        'INSERT INTO taikhoan_vaitro (taikhoan_id, vaitro_id) VALUES (?, ?)',
                        { replacements: [user.id_taikhoan, 3] }
                    );
                }

                return done(null, user as any);
            } catch (error) {
                return done(error as Error, undefined);
            }
        }
    )
);

// Facebook OAuth Strategy
passport.use(
    new FacebookStrategy(
        {
            clientID: env.FACEBOOK_CLIENT_ID,
            clientSecret: env.FACEBOOK_CLIENT_SECRET,
            callbackURL: env.FACEBOOK_CALLBACK_URL,
            profileFields: ['id', 'emails', 'name', 'displayName'],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if user already exists
                let user = await TaiKhoan.findOne({
                    where: { email: profile.emails?.[0].value },
                });

                if (!user) {
                    // Create new user
                    const randomPassword = generatePassword();
                    user = await TaiKhoan.create({
                        hoten: profile.displayName || `${profile.name?.givenName} ${profile.name?.familyName}`,
                        email: profile.emails?.[0].value || '',
                        matkhau: randomPassword,
                        sodienthoai: '',
                        trangthai: true,
                        oauth_provider: 'facebook',
                        oauth_id: profile.id,
                    });

                    // Assign default Customer role (vaitro_id = 3) using raw query
                    await sequelize.query(
                        'INSERT INTO taikhoan_vaitro (taikhoan_id, vaitro_id) VALUES (?, ?)',
                        { replacements: [user.id_taikhoan, 3] }
                    );
                }

                return done(null, user as any);
            } catch (error) {
                return done(error as Error, undefined);
            }
        }
    )
);

export default passport;
