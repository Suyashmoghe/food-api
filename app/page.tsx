import Nav from "./nav";
import { Metadata } from "next";
import Header from "./header";
import Footer from "./footer";
import FoodApi from "./foodAPi";

export const metaData: Metadata = {
  title: "Food App",
  description: "this is my home page",
};

export default function Home() {
  return (
    <div className="max-w-[1200] mx-auto px-10 flex flex-col gap-3 py-3">
      <Header />
      <Nav />
      <main>
        <FoodApi />
      </main>
      <Footer />
    </div>
  );
}
