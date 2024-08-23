import { AuthProvider } from "@/app/_context/authContext";
import GiftsC from "../_components/gifts";

export default function Gifts() {
  return <AuthProvider>{<GiftsC />}</AuthProvider>;
}
