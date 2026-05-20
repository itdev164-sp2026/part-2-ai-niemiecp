import {
  Home,
  FolderOpen,
  Settings,
  LogOut,
} from "lucide-react";
import { signOut } from "@/app/auth-actions";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import type { User } from "@supabase/supabase-js";

interface AppSidebarProps {
  user?: User | null;
}

const items = [
  {
    title: "Overview",
    url: "/",
    icon: Home,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: FolderOpen,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar({ user }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <span className="text-lg font-semibold">Dashboard</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      {user && (
        <SidebarFooter>
          <div className="space-y-2 border-t pt-4">
            <div className="px-2 text-xs text-muted-foreground">
              {user.email}
            </div>
            <form action={signOut} className="w-full">
              <Button
                type="submit"
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </form>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}