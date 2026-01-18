# Quick Start Guide - Laptop Shop Frontend

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

### Step 2: Configure Environment
```bash
# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:3000" > .env.local
```

### Step 3: Run Development Server
```bash
npm run dev
```

Visit: **http://localhost:3001**

---

## 📋 Verification Steps

### 1. Check Homepage
✅ Hero section loads  
✅ Featured products display  
✅ Categories show correctly  

### 2. Test Product Browsing
✅ Navigate to Products page  
✅ Products load in grid  
✅ Filters work (brand, price)  
✅ Search functionality works  

### 3. Test Product Detail
✅ Click on a product  
✅ Product details display  
✅ Can add to cart  
✅ Quantity selector works  

### 4. Test Shopping Cart
✅ Cart icon shows count  
✅ Cart page shows items  
✅ Can update quantities  
✅ Can remove items  
✅ Total calculates correctly  

### 5. Test Authentication
✅ Login page loads  
✅ Can register new account  
✅ Can login with credentials  
✅ User menu appears after login  
✅ Can logout  

### 6. Test Profile
✅ Profile page loads  
✅ User info displays  
✅ Orders show (if any)  

---

## 🐛 Troubleshooting

### Issue: Can't connect to backend
**Solution:**
```bash
# 1. Check backend is running
cd ../backend
npm run dev

# 2. Verify .env.local has correct API URL
cat .env.local
```

### Issue: Products not loading
**Solution:**
- Open browser console (F12)
- Check for API errors
- Verify backend has product data
- Check CORS settings in backend

### Issue: Can't login
**Solution:**
- Check backend auth endpoints are working
- Clear browser localStorage
- Verify credentials are correct
- Check backend logs

### Issue: Styling looks broken
**Solution:**
```bash
# Rebuild TailwindCSS
npm run dev
# Or force rebuild
rm -rf .next
npm run dev
```

---

## 📱 Test on Mobile

### Chrome DevTools
1. Press F12
2. Click device toolbar icon
3. Select mobile device
4. Test all features

### Real Device
1. Find your computer's IP address
2. Update .env.local: `NEXT_PUBLIC_APP_URL=http://YOUR_IP:3001`
3. Visit http://YOUR_IP:3001 on mobile

---

## 🎯 Key Features to Demo

### 1. Beautiful UI
- Modern gradient backgrounds
- Smooth animations
- Responsive design
- Professional product cards

### 2. Smart Filtering
- Filter by brand
- Filter by price range
- Sort options
- Search products

### 3. Seamless Cart
- Add products from any page
- Update quantities in cart
- Live total calculation
- Persistent cart (stays after refresh)

### 4. User Experience
- Fast page loads
- Clear navigation
- Helpful error messages
- Loading indicators

---

## 💡 Quick Tips

### For Development
```bash
# Hot reload is automatic
# Just save files and see changes

# Check for errors in terminal
# And in browser console (F12)

# Use React DevTools extension
# To inspect components and state
```

### For Testing
```bash
# Test with different screen sizes
# Test with slow network (throttle in DevTools)
# Test with empty states (no products, empty cart)
# Test error states (disconnect backend)
```

### For Demo
```bash
# Have some products in database
# Create a test user account beforehand
# Add some items to cart
# Show the entire flow: browse → detail → cart → checkout
```

---

## 📞 Need Help?

Common commands:
```bash
# Start fresh
rm -rf node_modules .next
npm install
npm run dev

# Check for errors
npm run lint

# Build for production
npm run build

# Test production build
npm run build && npm run start
```

---

## ✅ Success Checklist

Before presenting:
- [ ] Frontend runs without errors
- [ ] Backend API is running
- [ ] Can browse products
- [ ] Can view product details
- [ ] Can add to cart
- [ ] Can login/register
- [ ] Cart persists
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] All images load

---

## 🎉 You're Ready!

Your Laptop Shop frontend is now running. Enjoy exploring the features!
