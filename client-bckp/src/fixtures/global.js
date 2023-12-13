import icon from "@/assets/icon"
import { Home, Person } from "@mui/icons-material"

export const listNavbar = [
  { icon: icon.Home, label: "Home", to: "/" },
  { icon: icon.Person, label: "Profile", to: "/profile" },
  { icon: icon.Chat, label: "Chat", to: "/chat" },

  //   { icon: IconGauge, label: "Dashboard" },
  //   { icon: IconDeviceDesktopAnalytics, label: "Analytics" },
  //   { icon: IconCalendarStats, label: "Releases" },
  //   { icon: IconFingerprint, label: "Security" },
  //   { icon: IconSettings, label: "Settings" },
]


export const COMMENT_REPLY_ID = "comment-reply"