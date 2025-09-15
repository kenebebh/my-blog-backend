// EXAMPLE 1: Basic pagination only
// URL: GET /users?page=2&limit=10
req.query = {
  page: "2",
  limit: "10",
};

// After filtering:
const filter = { ...req.query }; // { page: "2", limit: "10" }
delete filter.page; // { limit: "10" }
delete filter.limit; // {}
delete filter.sort; // {}

// Final filter = {} (empty object = no filtering, get all users)
// MongoDB query: User.find({}).skip(10).limit(10)

//=================================================================

// EXAMPLE 2: Filter by user role
// URL: GET /users?role=admin&page=1&limit=5
req.query = {
  role: "admin",
  page: "1",
  limit: "5",
};

// After filtering:
const filter = { ...req.query }; // { role: "admin", page: "1", limit: "5" }
delete filter.page; // { role: "admin", limit: "5" }
delete filter.limit; // { role: "admin" }
delete filter.sort; // { role: "admin" }

// Final filter = { role: "admin" }
// MongoDB query: User.find({ role: "admin" }).skip(0).limit(5)

//=================================================================

// EXAMPLE 3: Multiple filters
// URL: GET /users?role=admin&status=active&city=Lagos&page=2&limit=10&sort=name
req.query = {
  role: "admin",
  status: "active",
  city: "Lagos",
  page: "2",
  limit: "10",
  sort: "name",
};

// After filtering:
const filter = { ...req.query }; // { role: "admin", status: "active", city: "Lagos", page: "2", limit: "10", sort: "name" }
delete filter.page; // { role: "admin", status: "active", city: "Lagos", limit: "10", sort: "name" }
delete filter.limit; // { role: "admin", status: "active", city: "Lagos", sort: "name" }
delete filter.sort; // { role: "admin", status: "active", city: "Lagos" }

// Final filter = { role: "admin", status: "active", city: "Lagos" }
// MongoDB query: User.find({ role: "admin", status: "active", city: "Lagos" }).skip(10).limit(10).sort("name")

//=================================================================

// EXAMPLE 4: Product filtering
// URL: GET /products?category=electronics&price=299&inStock=true&page=3&limit=20
req.query = {
  category: "electronics",
  price: "299",
  inStock: "true",
  page: "3",
  limit: "20",
};

// After filtering:
const filter = { ...req.query }; // { category: "electronics", price: "299", inStock: "true", page: "3", limit: "20" }
delete filter.page; // { category: "electronics", price: "299", inStock: "true", limit: "20" }
delete filter.limit; // { category: "electronics", price: "299", inStock: "true" }
delete filter.sort; // { category: "electronics", price: "299", inStock: "true" }

// Final filter = { category: "electronics", price: "299", inStock: "true" }
// MongoDB query: Product.find({ category: "electronics", price: "299", inStock: "true" }).skip(40).limit(20)
