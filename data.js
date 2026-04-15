const FOODS = [
  // PIZZA
  { id:1, name:"Margherita Classic", desc:"San Marzano tomatoes, fresh mozzarella, fragrant basil on thin crust", price:299, emoji:"🍕", cat:"pizza", rating:4.8, reviews:1240, bg:"bg-red", veg:true, time:25 },
  { id:2, name:"Pepperoni Blast", desc:"Double pepperoni, smoked mozzarella, spicy tomato sauce", price:399, emoji:"🍕", cat:"pizza", rating:4.7, reviews:980, bg:"bg-orange", veg:false, time:28 },
  { id:3, name:"BBQ Chicken Pizza", desc:"Grilled chicken, caramelized onions, smoky BBQ sauce", price:449, emoji:"🍕", cat:"pizza", rating:4.6, reviews:750, bg:"bg-yellow", veg:false, time:30 },
  { id:4, name:"Paneer Tikka Pizza", desc:"Spiced paneer, capsicum, onions, mint chutney base", price:379, emoji:"🍕", cat:"pizza", rating:4.9, reviews:1500, bg:"bg-green", veg:true, time:27 },

  // BURGER
  { id:5, name:"Classic Smash Burger", desc:"Double smashed patty, American cheese, pickles, special sauce", price:249, emoji:"🍔", cat:"burger", rating:4.9, reviews:2100, bg:"bg-orange", veg:false, time:15 },
  { id:6, name:"Crispy Chicken Burger", desc:"Buttermilk fried chicken, coleslaw, sriracha mayo", price:219, emoji:"🍔", cat:"burger", rating:4.7, reviews:1680, bg:"bg-yellow", veg:false, time:18 },
  { id:7, name:"Veg Aloo Tikki Burger", desc:"Crispy potato patty, mint chutney, crunchy slaw", price:149, emoji:"🍔", cat:"burger", rating:4.5, reviews:890, bg:"bg-green", veg:true, time:12 },
  { id:8, name:"Black Bean Burger", desc:"Spiced black bean patty, avocado, chipotle aioli", price:229, emoji:"🍔", cat:"burger", rating:4.6, reviews:540, bg:"bg-purple", veg:true, time:16 },

  // BIRYANI
  { id:9, name:"Hyderabadi Dum Biryani", desc:"Slow-cooked basmati, saffron, caramelised onions, raita", price:329, emoji:"🍚", cat:"biryani", rating:4.9, reviews:3200, bg:"bg-orange", veg:false, time:40 },
  { id:10, name:"Chicken Chettinad Biryani", desc:"Bold Chettinad spices, free-range chicken, long grain rice", price:299, emoji:"🍚", cat:"biryani", rating:4.8, reviews:2800, bg:"bg-red", veg:false, time:38 },
  { id:11, name:"Veg Dum Biryani", desc:"Seasonal vegetables, whole spices, saffron milk", price:249, emoji:"🍚", cat:"biryani", rating:4.6, reviews:1100, bg:"bg-green", veg:true, time:35 },
  { id:12, name:"Prawn Biryani", desc:"Jumbo prawns marinated in coastal masala, coconut rice", price:399, emoji:"🍚", cat:"biryani", rating:4.7, reviews:1450, bg:"bg-blue", veg:false, time:42 },

  // NOODLES
  { id:13, name:"Hakka Noodles", desc:"Stir-fried noodles with vegetables, soy, ginger-garlic", price:179, emoji:"🍜", cat:"noodles", rating:4.5, reviews:920, bg:"bg-yellow", veg:true, time:15 },
  { id:14, name:"Chicken Ramen", desc:"Rich tonkotsu broth, soft-boiled egg, chashu pork, nori", price:349, emoji:"🍜", cat:"noodles", rating:4.8, reviews:780, bg:"bg-orange", veg:false, time:20 },
  { id:15, name:"Pad Thai Noodles", desc:"Rice noodles, shrimp, peanuts, tamarind sauce, lime", price:299, emoji:"🍜", cat:"noodles", rating:4.7, reviews:660, bg:"bg-green", veg:false, time:18 },
  { id:16, name:"Singapore Noodles", desc:"Thin vermicelli, curry powder, prawns, BBQ pork", price:279, emoji:"🍜", cat:"noodles", rating:4.5, reviews:490, bg:"bg-purple", veg:false, time:17 },

  // SUSHI
  { id:17, name:"Salmon Nigiri (6pc)", desc:"Fresh Atlantic salmon over hand-pressed seasoned rice", price:499, emoji:"🍣", cat:"sushi", rating:4.9, reviews:620, bg:"bg-blue", veg:false, time:10 },
  { id:18, name:"Spicy Tuna Roll", desc:"Spicy tuna, cucumber, avocado, sriracha drizzle", price:449, emoji:"🍣", cat:"sushi", rating:4.8, reviews:580, bg:"bg-red", veg:false, time:12 },
  { id:19, name:"Dragon Roll", desc:"Shrimp tempura inside, avocado outside, eel sauce", price:549, emoji:"🍣", cat:"sushi", rating:4.9, reviews:430, bg:"bg-green", veg:false, time:14 },
  { id:20, name:"Avocado Roll (8pc)", desc:"Creamy avocado, cucumber, sesame seeds", price:299, emoji:"🍣", cat:"sushi", rating:4.6, reviews:350, bg:"bg-yellow", veg:true, time:10 },

  // SALAD
  { id:21, name:"Caesar Salad", desc:"Romaine, parmesan, croutons, house Caesar dressing", price:219, emoji:"🥗", cat:"salad", rating:4.5, reviews:720, bg:"bg-green", veg:true, time:10 },
  { id:22, name:"Quinoa Power Bowl", desc:"Tri-colour quinoa, roasted chickpeas, tahini dressing", price:279, emoji:"🥗", cat:"salad", rating:4.7, reviews:540, bg:"bg-yellow", veg:true, time:12 },
  { id:23, name:"Watermelon Feta Salad", desc:"Seedless watermelon, feta, mint, balsamic glaze", price:249, emoji:"🥗", cat:"salad", rating:4.8, reviews:390, bg:"bg-red", veg:true, time:8 },

  // DESSERT
  { id:24, name:"Chocolate Lava Cake", desc:"Warm dark chocolate fondant, vanilla ice cream", price:199, emoji:"🍰", cat:"dessert", rating:4.9, reviews:1820, bg:"bg-orange", veg:true, time:12 },
  { id:25, name:"Gulab Jamun (4pc)", desc:"Soft milk-solid dumplings soaked in rose syrup", price:129, emoji:"🍩", cat:"dessert", rating:4.7, reviews:2200, bg:"bg-yellow", veg:true, time:5 },
  { id:26, name:"Tiramisu", desc:"Espresso-soaked ladyfingers, mascarpone, cocoa dust", price:249, emoji:"🍰", cat:"dessert", rating:4.8, reviews:980, bg:"bg-purple", veg:true, time:5 },
  { id:27, name:"Mango Kulfi", desc:"Artisan frozen dessert with Alphonso mango, cardamom", price:149, emoji:"🍦", cat:"dessert", rating:4.9, reviews:1600, bg:"bg-orange", veg:true, time:5 },

  // DRINKS
  { id:28, name:"Mango Lassi", desc:"Thick Alphonso mango blended with hung curd, saffron", price:119, emoji:"🥤", cat:"drinks", rating:4.8, reviews:1400, bg:"bg-yellow", veg:true, time:5 },
  { id:29, name:"Masala Chai", desc:"Freshly brewed tea with ginger, cardamom, cinnamon", price:69, emoji:"☕", cat:"drinks", rating:4.9, reviews:2800, bg:"bg-orange", veg:true, time:5 },
  { id:30, name:"Cold Brew Coffee", desc:"18-hour steeped single-origin, served over ice", price:169, emoji:"🧋", cat:"drinks", rating:4.7, reviews:760, bg:"bg-purple", veg:true, time:5 },
  { id:31, name:"Fresh Lime Soda", desc:"Freshly squeezed lime, sparkling water, hint of mint", price:79, emoji:"🥤", cat:"drinks", rating:4.6, reviews:1100, bg:"bg-green", veg:true, time:5 },

  // SANDWICH
  { id:32, name:"Club Sandwich", desc:"Triple-decker chicken, bacon, egg, tomato, lettuce", price:199, emoji:"🥪", cat:"sandwich", rating:4.6, reviews:880, bg:"bg-yellow", veg:false, time:12 },
  { id:33, name:"Grilled Paneer Sandwich", desc:"Tikka paneer, green chutney, red onion, toasted sourdough", price:169, emoji:"🥪", cat:"sandwich", rating:4.7, reviews:650, bg:"bg-green", veg:true, time:10 },
  { id:34, name:"BLT Ciabatta", desc:"Smoked bacon, iceberg lettuce, heirloom tomato, aoili", price:229, emoji:"🥪", cat:"sandwich", rating:4.5, reviews:430, bg:"bg-orange", veg:false, time:10 },

  // TACOS
  { id:35, name:"Carne Asada Taco (3pc)", desc:"Grilled beef, pico de gallo, guacamole, cotija cheese", price:279, emoji:"🌮", cat:"tacos", rating:4.8, reviews:720, bg:"bg-red", veg:false, time:15 },
  { id:36, name:"Fish Taco (3pc)", desc:"Beer-battered fish, cabbage slaw, chipotle crema", price:299, emoji:"🌮", cat:"tacos", rating:4.7, reviews:580, bg:"bg-blue", veg:false, time:18 },
  { id:37, name:"Veg Jackfruit Taco (3pc)", desc:"BBQ pulled jackfruit, pickled onion, cilantro, lime", price:249, emoji:"🌮", cat:"tacos", rating:4.6, reviews:390, bg:"bg-green", veg:true, time:15 },
];
