import {
  Bell,
  Clapperboard,
  DollarSign,
  Home,
  Package,
  Popcorn,
  Theater,
  User,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Sidebar() {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex flex-col h-full max-h-screen gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Popcorn className="w-6 h-6" />
            <span className="">Cinefy</span>
          </Link>
          <Button variant="outline" size="icon" className="w-8 h-8 ml-auto">
            <Bell className="w-4 h-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              to="/admin"
              className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary">
              <Home className="w-4 h-4" />
              Dashboard
            </Link>

            <Link
              to="/admin/genres"
              className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary">
              <Package className="w-4 h-4" />
              Genre{" "}
            </Link>

            <Link
              to="/admin/theaters"
              className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary">
              <Theater className="w-4 h-4" />
              Theaters{" "}
            </Link>

            <Link
              to="/admin/movies"
              className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary">
              <Clapperboard className="w-4 h-4" />
              Movies{" "}
            </Link>

            <Link
              to="/admin/customers"
              className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary">
              <User className="w-4 h-4" />
              Customers{" "}
            </Link>

            <Link
              to="/admin/transactions"
              className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary">
              <DollarSign className="w-4 h-4" />
              Transactions{" "}
            </Link>

            <Link
              to="/admin/wallet-transactions"
              className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary">
              <Wallet className="w-4 h-4" />
              Wallet Transactions{" "}
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
