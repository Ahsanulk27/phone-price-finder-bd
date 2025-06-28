import { useState } from "react";
import { Search, Smartphone, TrendingUp, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// Mock data for demonstration
// const mockResults = [
//   {
//     id: 1,
//     model: "iPhone 13 Pro Max",
//     price: "৳89,999",
//     condition: "New",
//     platform: "Daraz",
//     platformLogo: "🛒",
//     image: "/placeholder.svg",
//   },
//   {
//     id: 2,
//     model: "iPhone 13 Pro Max",
//     price: "৳85,000",
//     condition: "Used",
//     platform: "Bikroy",
//     platformLogo: "🏪",
//     image: "/placeholder.svg",
//   },
//   {
//     id: 3,
//     model: "iPhone 13 Pro Max",
//     price: "৳92,500",
//     condition: "New",
//     platform: "SWAP",
//     platformLogo: "🔄",
//     image: "/placeholder.svg",
//   },
// ];

const popularBrands = ["iPhone", "Samsung", "Xiaomi", "Realme", "Oppo", "Vivo"];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [sortBy, setSortBy] = useState("price-low");
  const [filterCondition, setFilterCondition] = useState("all");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      setShowResults(true);
      setLoading(true); // set loading true before fetch
      console.log("Searching for:", searchQuery);
      try {
        const res = await fetch(
          `http://localhost:3001/api/search?q=${encodeURIComponent(
            searchQuery
          )}`
        );
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching search results: ", error);
      } finally {
        setLoading(false); // always set loading false
      }
    }
  };

  const filteredResults = Array.isArray(results)
    ? results.filter((result) => {
        // your filter logic here
        return (
          filterCondition === "all" || result.condition === filterCondition
        );
      })
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Smartphone className="h-8 w-8 text-neon-teal-500" />
            <h1 className="text-2xl font-bold text-white">PriceHunt BD</h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-neon-teal-500 text-neon-teal-500 hover:bg-neon-teal-500 hover:text-slate-900"
          >
            Feedback
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Find the Best
            <span className="text-neon-teal-500 block">Mobile Phone Deals</span>
          </h2>

          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Compare mobile phone prices from Bikroy, Daraz, SWAP — all in one
            place. Save time and money with Bangladesh's fastest price
            comparison tool.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative search-glow rounded-xl bg-slate-800 border border-slate-600">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search iPhone 11, Redmi Note 12 Pro, Galaxy S21..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="pl-12 pr-20 py-4 text-lg bg-transparent border-none text-white placeholder-slate-400 focus:ring-0 focus:outline-none"
              />
              <Button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-neon-teal-500 hover:bg-neon-teal-600 text-slate-900 font-semibold px-6"
              >
                Search
              </Button>
            </div>
          </div>

          {/* Popular Brands */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <span className="text-slate-400 mr-2">Popular:</span>
            {popularBrands.map((brand) => (
              <Badge
                key={brand}
                variant="outline"
                className="border-slate-600 text-slate-300 hover:border-neon-teal-500 hover:text-neon-teal-500 cursor-pointer transition-colors"
                onClick={() => {
                  setSearchQuery(brand);
                  setShowResults(true);
                }}
              >
                {brand}
              </Badge>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-neon-teal-500 mb-2">
                3+
              </div>
              <div className="text-slate-400">Platforms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neon-teal-500 mb-2">
                1000+
              </div>
              <div className="text-slate-400">Phone Models</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neon-teal-500 mb-2">
                ৳5K+
              </div>
              <div className="text-slate-400">Avg. Savings</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Results */}
      {showResults && (
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Results Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Search Results for "{searchQuery}"
                </h3>
                <p className="text-slate-400">
                  {filteredResults.length} results found
                </p>
              </div>

              {/* Filters */}
              <div className="flex gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 bg-slate-800 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filterCondition}
                  onValueChange={setFilterCondition}
                >
                  <SelectTrigger className="w-32 bg-slate-800 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="used">Used</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results Grid */}
            {/* Results Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-slate-800 border border-slate-700 p-6 rounded-lg animate-pulse"
                  >
                    <div className="h-4 w-1/3 bg-slate-600 rounded mb-2"></div>
                    <div className="h-4 w-2/3 bg-slate-700 rounded mb-4"></div>
                    <div className="h-6 w-1/2 bg-slate-600 rounded mb-4"></div>
                    <div className="h-10 w-full bg-slate-700 rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResults.map((result, i) => (
                  <Card
                    key={i}
                    className="bg-slate-800 border-slate-700 card-hover cursor-pointer"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">
                            {result.source === "Daraz" ? "🛒" : "🧩"}
                          </div>
                          <div>
                            <div className="text-sm text-slate-400">
                              {result.source}
                            </div>
                            <Badge
                              variant="outline"
                              className={`text-xs mt-1 ${
                                result.condition === "new"
                                  ? "border-green-500 text-green-400"
                                  : "border-yellow-500 text-yellow-400"
                              }`}
                            >
                              {result.condition}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <h4 className="text-lg font-semibold text-white mb-3">
                        {result.title}
                      </h4>

                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-neon-teal-500">
                          ৳ {result.price}
                        </div>
                        <a
                          href={result.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            size="sm"
                            className="bg-neon-teal-500 hover:bg-neon-teal-600 text-slate-900"
                          >
                            View Deal
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-slate-400 mb-4">
              Built with <Heart className="inline h-4 w-4 text-red-500" />
            </p>
            <div className="flex justify-center gap-6">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-neon-teal-500"
              >
                About
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-neon-teal-500"
              >
                Contact
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-neon-teal-500"
              >
                Privacy Policy
              </Button>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-800">
              <p className="text-sm text-slate-500">
                © 2024 PriceHunt BD. Compare prices from Bikroy, Daraz, SWAP and
                more.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
