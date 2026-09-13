import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Navigation from "./Navigation";
import UserActions from "./UserActions";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-shadow duration-200">
      {/* Top Banner / Announcement Bar */}
      <div className="bg-slate-900 py-1.5 px-4 text-center text-xs font-medium text-slate-200">
        <div className="container mx-auto flex items-center justify-between">
          <p className="hidden sm:inline-block">
            🌟 <span className="text-orange-400 font-semibold">Weekend Mega Deal:</span> Up to 60% OFF top tech & fashion!
          </p>
          <p className="mx-auto sm:mx-0">
            Free shipping on worldwide orders over <span className="text-white font-bold">$49</span>
          </p>
          <div className="hidden lg:flex items-center gap-4 text-slate-300">
            <span>24/7 Support</span>
            <span>•</span>
            <span>Track Order</span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="container mx-auto px-4 py-3 sm:py-3.5">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop & Tablet Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-2">
            <SearchBar />
          </div>

          {/* User Actions & Mobile Controls */}
          <div className="flex items-center gap-2">
            <UserActions />
            <MobileMenu />
          </div>
        </div>

        {/* Mobile Search Bar (Full width underneath on small screens) */}
        <div className="mt-2.5 md:hidden">
          <SearchBar isCompact={true} />
        </div>

        {/* Desktop Secondary Category Navigation */}
        <div className="border-t border-slate-100 mt-2.5 pt-1">
          <Navigation />
        </div>
      </div>
    </header>
  );
}
