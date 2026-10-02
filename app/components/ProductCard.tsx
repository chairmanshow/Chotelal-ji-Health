import React from 'react';
import {
  Star,
  ShoppingBag,
  ShieldCheck,
  Check,
  Sparkles,
} from 'lucide-react';

export interface ProductItem {
  id: string;
  name: string;
  hindiName: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge: string;
  ingredients: string;
  benefits: string;
}

interface ProductCardProps {
  product: ProductItem;
  onAddToCart?: (product: ProductItem) => void;
  onBuyNow?: (product: ProductItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onBuyNow,
}) => {
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200/90 hover:border-[#FF9933] shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between group">
      <div>
        {/* Image with Badges */}
        <div className="relative rounded-xl overflow-hidden bg-slate-100 aspect-square mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-[#1E3A8A] text-white text-[10px] font-black shadow-xs">
            {product.badge}
          </span>
          <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black shadow-xs">
            {discountPercent}% OFF
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold mb-1">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{product.rating}</span>
          <span className="text-slate-400 font-normal">({product.reviewsCount} समीक्षाएं)</span>
        </div>

        {/* Titles */}
        <h4 className="text-base font-black text-slate-900 group-hover:text-[#1E3A8A] transition-colors leading-snug">
          {product.hindiName}
        </h4>
        <p className="text-xs text-slate-500 font-medium truncate">{product.name}</p>

        {/* Ingredients & Benefits */}
        <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
          <span className="font-bold text-slate-700">घटक:</span> {product.ingredients}
        </p>
      </div>

      {/* Pricing & CTA */}
      <div className="mt-5 pt-3 border-t border-slate-100">
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-xl font-black text-slate-900">₹{product.price}</span>
          <span className="text-xs text-slate-400 line-through">₹{product.originalPrice}</span>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
            बचत ₹{product.originalPrice - product.price}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onAddToCart && onAddToCart(product)}
            className="py-2.5 px-3 rounded-xl border border-[#FF9933] text-[#FF9933] hover:bg-[#FF9933]/10 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>कार्ट में जोड़ें</span>
          </button>

          <button
            type="button"
            onClick={() => onBuyNow ? onBuyNow(product) : onAddToCart && onAddToCart(product)}
            className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#FF9933] to-amber-600 hover:from-amber-600 hover:to-[#FF9933] text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-1"
          >
            <span>अभी खरीदें</span>
          </button>
        </div>
      </div>
    </div>
  );
};
