import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Navigation from "./Navigation";
import UserActions from "./UserActions";
import MobileMenu from "./MobileMenu";
import AnnouncementTicker from "./AnnouncementTicker";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E5E9ED] bg-white transition-shadow duration-200">
      {/* Top Banner / Announcement Bar with Infinite Ticker */}
      <AnnouncementTicker />

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
        <div className="border-t border-[#E5E9ED] mt-2.5 pt-1">
          <Navigation />
        </div>
      </div>
    </header>
  );
}
