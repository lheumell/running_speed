"use client";

import Image from "next/image";
import Button from "./components/Button";
import Link from "next/link";

export default function Home() {
  return (
    <section className="bg-run-50 h-screen">
      <div className="flex items-center h-screen p-24 gap-8">
        <div className="bg-white border border-2 border-neuttral rounded-lg p-4 mx-auto max-w-screen-xl lg:flex flex-col p-12 w-3/4 h-3/4">
          <div className="flex flex-col justify-around gap-4 h-full">
            <div>
              <h1 className="text-3xl font-extrabold sm:text-5xl text-neutral mb-4">
                Runiverse.
              </h1>
              <h2 className="sm:text-3xl font-extrabold text-run-700 sm:block">
                {" "}
                Courir Plus Intelligemment : Outils et Conseils pour Coureurs de
                Tous Niveaux.{" "}
              </h2>{" "}
            </div>
            <div className="lg:flex lg:items-center justify-center">
              <div className="mt-8 flex flex-row  justify-center gap-4 w-1/2">
                <Button
                  onClick={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                >
                  <a
                    // className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                    href="/speed-calculator"
                  >
                    Calculer son allure
                  </a>
                </Button>
                <Button
                  onClick={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  variant="secondary"
                >
                  <Link
                    // className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                    href="/blog"
                  >
                    Blogs
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Image src={"/stats.svg"} alt={""} width={500} height={500} />
        </div>
      </div>
    </section>
  );
}
