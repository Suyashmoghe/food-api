"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
};

export default function FoodApi() {
  const [item, setItem] = useState<Meal[]>([]);
  const [error, setError] = useState("");

  async function submitForm(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const val = (e.currentTarget.elements.namedItem("food") as HTMLInputElement)
      .value;

    try {
      if (!val.trim().length) {
        setError("enter something");
        setItem([]);
      } else {
        const x = await fetch(
          `${process.env.NEXT_PUBLIC_FOOD_API_URL_NAME}?s=${val}`,
        );

        if (!x.ok) {
          throw new Error(String(x.status));
        }

        const y = await x.json();
        // console.log(y);
        //console.log(y.meals);

        const z = y.meals;

        if (!z) {
          setItem([]);
          setError("food not found");
        } else {
          setError("");
          setItem(z);
        }
      }
    } catch (err) {
      console.warn(err);
    }
  }

  return (
    <div>
      <form
        className="flex justify-center items-center mt-3 gap-3 mb-3"
        onSubmit={submitForm}
      >
        <label htmlFor="food">Enter Food Name : </label>
        <input type="text" id="food" name="food" className="border-2 px-4" />
        <button className="bg-red-500 px-4 text-white cursor-pointer rounded hover:bg-red-300">
          Click
        </button>
        <output>{error}</output>
      </form>

      <div className="grid grid-cols-2 gap-3">
        {item.map((ele, ind) => (
          <section key={ind} className="border-2 px-4 py-2">
            <Link href={`/${ele.idMeal}`} className="block">
              <div className="flex gap-3">
                <div>
                  <Image
                    src={ele.strMealThumb}
                    alt={ele.strMeal}
                    width={150}
                    height={150}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-2xl">{ele.strMeal}</h3>
                  <p>Meal ID : {ele.idMeal}</p>
                  <p>Country : {ele.strArea}</p>
                  <p>Category : {ele.strCategory}</p>
                </div>
              </div>
            </Link>
          </section>
        ))}
      </div>
    </div>
  );
}
