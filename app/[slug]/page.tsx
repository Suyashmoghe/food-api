"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams } from "next/navigation";
import Header from "../header";
import Footer from "../footer";
import Nav from "../nav";
import Image from "next/image";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
};

function FoodItemContent() {
  const { slug } = useParams();

  const [meal, setMeal] = useState<Meal | null>(null);

  useEffect(() => {
    async function fetchMeal() {
      try {
        const x = await fetch(
          `${process.env.NEXT_PUBLIC_FOOD_API_URL_ID}?i=${slug}`,
        );

        if (!x.ok) {
          throw new Error("error found");
        }

        const y = await x.json();
        // console.log(y);

        const z = y.meals;
        // console.log(z);

        const a = z[0];
        // console.log(a);

        setMeal(a);
      } catch (err) {
        console.warn(err);
      }
    }

    fetchMeal();
  }, [slug]);

  return (
    <div className="max-w-[1200] px-10 flex flex-col gap-3 container py-3 justify-center items-center">
      <Header />
      <Nav />

      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-3xl font-bold">Name : {meal?.strMeal}</h2>
            <p>Food ID : {slug}</p>
            <p>Category : {meal?.strCategory}</p>
            <p>Country : {meal?.strArea}</p>
            <p className="my-2">
              <strong>Instructions</strong> : {meal?.strInstructions}
            </p>
          </div>

          <div className="flex justify-center items-center">
            {meal?.strMealThumb && (
              <Image
                src={meal.strMealThumb}
                alt={meal.strMeal || "Meal image"}
                width={300}
                height={300}
                className="block"
                loading="eager"
              />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function FoodItem() {
  return (
    <Suspense fallback={<p>Loading item...</p>}>
      <FoodItemContent />
    </Suspense>
  );
}
