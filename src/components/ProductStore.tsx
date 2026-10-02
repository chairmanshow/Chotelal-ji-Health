import React, { useState } from 'react';
import { HealthCategory, RecommendedProduct } from '../types';
import { PRODUCTS_CATALOG } from '../data/mockData';
import { ShoppingBag, Star, ShieldCheck, Check, Sparkles, Truck } from 'lucide-react';

interface ProductStoreProps {
  onAddToCart: (product: RecommendedProduct) => void;
  selectedCategory: HealthCategory;
}

export const ProductStore: React.FC<ProductStoreProps> = ({
  onAddToCart,
  selectedCategory,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const displayedProducts =
    filterCategory === 'all'
      ? PRODUCTS_CATALOG
      : PRODUCTS_CATALOG.filter((p) => p.category === filterCategory);

  const handleAdd = (product: RecommendedProduct) => {
    onAddToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1500);
  };

  return (
    <section id="products-store" className="py-14 bg-slate-50 border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>छोटेलाल जी प्रमाणित स्टोर • 100% शुद्ध आयुर्वेदिक</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            रोग-निवारक आयुर्वेदिक किट एवं एर्गोनोमिक उत्पाद
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            आयुष मंत्रालय के मानकों पर तैयार, प्रयोगशाला में जांची गई जड़ी-बूटियों से निर्मित। पूरे भारत में कैश ऑन डिलीवरी (COD) उपलब्ध।
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'सभी उत्पाद (All Products)' },
            { id: 'piles_sitting', label: 'बवासीर व सिटिंग किट्स' },
            { id: 'mental_health', label: 'तनाव व गहरी नींद' },
            { id: 'hair_growth', label: 'हेयर रीग्रोथ ऑयल्स' },
            { id: 'general', label: 'इम्यूनिटी व पाचन' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                filterCategory === tab.id
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducts.map((product) => {
            const isJustAdded = addedProductId === product.id;

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-orange-300 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image container */}
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-orange-600 text-white text-[11px] font-black px-2.5 py-1 rounded-md shadow-sm">
                        {product.badge}
                      </span>
                    )}
                    <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-xs text-white text-xs font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                      <span className="text-[10px] text-slate-300">({product.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <h3 className="text-base font-black text-slate-900 leading-snug line-clamp-2">
                      {product.hindiName}
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold mb-2">
                      {product.name}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-3">
                      {product.description}
                    </p>

                    {/* Key Ingredients */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        प्रमुख घटक (Key Herbs):
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {product.keyIngredients.slice(0, 3).map((herb, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded-md border border-emerald-100"
                          >
                            🌿 {herb}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Pricing & CTA */}
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-black text-slate-900">
                          ₹{product.price}
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          ₹{product.originalPrice}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-bold block">
                        बचत: ₹{product.originalPrice - product.price}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAdd(product)}
                      className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                        isJustAdded
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-orange-600 hover:bg-orange-700 text-white shadow-md shadow-orange-600/20 hover:scale-105'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>जुड़ गया ✓</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>ऑर्डर करें</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3 h-3 text-slate-400" /> फ्री डिलीवरी उपलब्ध
                    </span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-500" /> 100% प्रामाणिक
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
