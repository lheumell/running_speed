"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import Input from "@/app/components/Input";
import Tabs from "@/app/components/Tabs";
import Card from "@/app/components/Card";
import Link from "next/link";

const TAB = {
  TIME: "Temps",
  PACE: "Allure",
};

export default function SpeedCalculator() {
  const [selectedItem, setSelectedItem] = useState(TAB.TIME);
  const [distance, setDistance] = useState<number | null>(0);
  const [time, setTime] = useState<{
    hours: number | null;
    minutes: number | null;
    secondes: number | null;
  }>({
    hours: 0,
    minutes: 0,
    secondes: 0,
  });
  const [pace, setPace] = useState<{
    minutes: number | null;
    secondes: number | null;
  }>({
    minutes: 0,
    secondes: 0,
  });
  const [resultTime, setResultTime] = useState<{
    speed: number;
    pace: number;
    tour: number;
  }>({
    speed: 0,
    pace: 0,
    tour: 0,
  });
  const [resultPace, setResultPace] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    averageSpeed: number;
  }>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    averageSpeed: 0,
  });

  const handleChangeDistance = useCallback((value: string) => {
    setDistance(+value || null);
  }, []);

  const handleChangeTime = useCallback(
    (value: string, type: "hours" | "minutes" | "secondes") =>
      setTime((time) => ({ ...time, [type]: +value })),
    []
  );

  const handleChangePace = useCallback(
    (value: string, type: "minutes" | "secondes") =>
      setPace((time) => ({ ...time, [type]: +value })),
    []
  );

  const returnNumber = (value: number | null) => {
    return value ?? 0;
  };

  useEffect(() => {
    const secondes = returnNumber(time.secondes);
    const minutes = returnNumber(time.minutes);
    const hours = returnNumber(time.hours);
    const metres = returnNumber(distance);

    // Conversion du temps total en secondes, minutes et heures
    const totalSeconds = secondes + minutes * 60 + hours * 3600;
    const totalMinutes = totalSeconds / 60;
    const totalHours = totalSeconds / 3600;

    // Conversion de la distance en kilomètres
    const kilometres = metres / 1000;

    // Calcul de la vitesse (km/h)
    const speed = totalHours === 0 ? 0 : kilometres / totalHours;

    // Calcul de l'allure (min/km)
    const pace = kilometres === 0 ? 0 : totalMinutes / kilometres;

    // Calcul du temps par tour (en supposant un tour de 400m)
    const lapTime = metres === 0 ? 0 : (totalSeconds / metres) * 400;

    setResultTime({
      speed: Math.round(speed * 100) / 100, // Arrondi à deux décimales
      pace: Math.round(pace * 100) / 100,
      tour: Math.round(lapTime * 100) / 100,
    });
  }, [distance, time.hours, time.minutes, time.secondes]);

  useEffect(() => {
    const paceMinutes = returnNumber(pace.minutes); // Allure en minutes
    const paceSeconds = returnNumber(pace.secondes); // Allure en secondes
    const metres = returnNumber(distance); // Distance en mètres

    // Conversion de l'allure totale en secondes
    const paceTotalSeconds = paceMinutes * 60 + paceSeconds;

    // Calcul du temps total (en secondes) pour la distance donnée
    const totalSeconds = (metres / 1000) * paceTotalSeconds;

    // Conversion du temps total en heures, minutes et secondes
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.round(totalSeconds % 60);

    // Conversion de la distance en kilomètres
    const kilometres = metres / 1000;

    // Calcul de la vitesse moyenne (en km/h)
    const averageSpeed =
      totalSeconds === 0 ? 0 : kilometres / (totalSeconds / 3600);

    setResultPace({
      hours,
      minutes,
      seconds,
      averageSpeed: Math.round(averageSpeed * 100) / 100,
    });
  }, [distance, pace.minutes, pace.secondes, time.minutes, time.secondes]);

  const renderTimeContent = useMemo(() => {
    return (
      <div className="grid grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-1 gap-4 bg-run-500 rounded-b-2xl rounded-se-2xl p-8 shadow-[3px_5px_0px_2px_black]">
        <div className="bg-run-100 rounded-2xl p-8 ">
          <Input
            value={returnNumber(time.hours)}
            label={"heure(s)"}
            onChange={(e) => handleChangeTime(e, "hours")}
          />
        </div>
        <div className="bg-run-100 rounded-2xl p-8">
          <Input
            value={returnNumber(time.minutes)}
            label={"minute(s)"}
            onChange={(e) => handleChangeTime(e, "minutes")}
          />
        </div>
        <div className="bg-run-100 rounded-2xl p-8 ">
          <Input
            value={returnNumber(time.secondes)}
            label={"seconde(s)"}
            onChange={(e) => handleChangeTime(e, "secondes")}
          />
        </div>
      </div>
    );
  }, [handleChangeTime, time.hours, time.minutes, time.secondes]);

  const renderPaceContent = useMemo(() => {
    return (
      <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-3 md:grid-rows-1 gap-4 bg-run-400 rounded-b-2xl rounded-se-2xl p-8 shadow-[3px_5px_0px_2px_black]">
        <div className="bg-run-100 rounded-2xl p-8">
          <Input
            value={returnNumber(pace.minutes)}
            label={"minute(s)"}
            onChange={(e) => handleChangePace(e, "minutes")}
          />
        </div>
        <div className="bg-run-100 rounded-2xl p-8">
          <Input
            value={returnNumber(pace.secondes)}
            label={"seconde(s)"}
            onChange={(e) => handleChangePace(e, "secondes")}
          />
        </div>
      </div>
    );
  }, [handleChangePace, pace.minutes, pace.secondes]);

  const renderContentTab = useMemo(() => {
    const CONTENT = {
      [TAB.TIME]: renderTimeContent,
      [TAB.PACE]: renderPaceContent,
    };
    return <div className="flex flex-col gap-2">{CONTENT[selectedItem]}</div>;
  }, [renderPaceContent, renderTimeContent, selectedItem]);

  const renderResultTime = useMemo(() => {
    return (
      <>
        <div className="flex flex-col text-center text-neutral">
          <h2 className="font-semibold">Vitesse Moyenne</h2>
          <p className="text-[36px]">{resultTime.speed} km/h</p>
        </div>
        <div className="flex gap-12 text-neutral">
          <div className="flex flex-col">
            <h2 className="text-center">Allure</h2>
            <p className="text-[24px]">{resultTime.pace} min/km</p>{" "}
          </div>
          <div className="flex flex-col">
            <h2 className="text-center">Temps par tour</h2>
            <p className="text-[24px]">{resultTime.tour} min/tour</p>{" "}
          </div>
        </div>
      </>
    );
  }, [resultTime.pace, resultTime.speed, resultTime.tour]);

  const renderResultPace = useMemo(() => {
    return (
      <>
        <div className="flex flex-col items-center text-neutral">
          <h2 className="font-semibold">Temps</h2>
          <p className="text-[36px]">
            {resultPace.hours}h {resultPace.minutes}min {resultPace.seconds}sec
          </p>
        </div>
        <div className="flex flex-col text-center text-neutral">
          <h2>Vitesse Moyenne</h2>
          <p className="text-[24px]">{resultPace.averageSpeed} km/h</p>
        </div>
      </>
    );
  }, [
    resultPace.averageSpeed,
    resultPace.hours,
    resultPace.minutes,
    resultPace.seconds,
  ]);

  const renderResult = useMemo(() => {
    const CONTENT = {
      [TAB.TIME]: renderResultTime,
      [TAB.PACE]: renderResultPace,
    };
    return <div className="flex flex-col gap-2">{CONTENT[selectedItem]}</div>;
  }, [renderResultPace, renderResultTime, selectedItem]);

  return (
    <div className="min-h-screen pb-20 gap-16 px-10 py-6 sm:px-20 sm:py-12 font-[family-name:var(--font-geist-sans)] bg-run-50">
      <header>
        <h1 className="font-bold text-[32px] text-neutral">
          Calculateur d’Allure Running – Trouvez votre rythme parfait
        </h1>
        <h3 className="font-semibold text-[24px] pb-24 text-run-600">
          Optimisez vos performances avec notre outil simple et rapide.
        </h3>
      </header>
      <main>
        <section className="grid grid-cols-12 grid-rows-1 gap-8 w-full">
          <div className="col-span-12 md:col-span-8 flex flex-col gap-4">
            <div className="bg-run-100 rounded-2xl p-8 w-full md:w-fit border-2 border-neutral shadow-[3px_5px_0px_2px_black]">
              <Input
                value={distance}
                label="mètres"
                onChange={handleChangeDistance}
              />
            </div>
            <div>
              <Tabs
                items={[
                  { label: "Temps", color: "bg-run-500" },
                  { label: "Allure", color: "bg-run-400" },
                ]}
                selectedItem={selectedItem}
                onClick={(item) => setSelectedItem(item)}
              />
              {renderContentTab}
            </div>
          </div>
          <div className="bg-run-600 rounded-2xl p-4 w-full col-span-12 md:col-span-4 shadow-[3px_5px_0px_2px_black]">
            <div
              className="rounded-2xl inset-0 h-full w-full flex flex-col items-center justify-center"
              style={{
                backgroundImage:
                  "linear-gradient(transparent 0%, rgb(146, 63, 14) 100%)",
              }}
            >
              {renderResult}
            </div>
          </div>
        </section>
        <section className="mt-24 flex flex-col items-center">
          <h2 className="font-semibold text-[24px] pb-12 text-run-600">
            Articles connexes
          </h2>
          <ul className="flex justify-center items-center gap-8">
            <li>
              <Card title="Découvrez comment créer un plan d’entraînement adapté à votre allure." />
              {/* <Link href="/blog/allure-course-a-pied">
                Pourquoi l’allure est essentielle pour progresser
              </Link> */}
            </li>
            <li>
              <Card title="Plan d’entraînement semi-marathon" />
              {/* <Link href="/blog/semi-marathon">
                Plan d’entraînement semi-marathon
              </Link> */}
            </li>
          </ul>
          <Link className="my-8 underline" href="/blogs">
            lien vers tous les blogs
          </Link>
        </section>
        <section className="mt-24">
          <h2 className="font-semibold text-[24px] pb-12 text-run-600">
            Comment utiliser notre calculateur ?
          </h2>
          <p>
            Entrez la distance de votre course et votre temps prévu pour
            connaître votre allure idéale.
          </p>
        </section>
        <section className="mt-24">
          <h2 className="font-semibold text-[24px] pb-12 text-run-600">
            Pourquoi connaître son allure ?
          </h2>
          <p>
            Comprendre votre allure est essentiel pour atteindre vos objectifs
            de course à pied.
          </p>
        </section>
        <section className="mt-24">
          <h3>Partagez votre allure</h3> avec balise OG
        </section>
      </main>
    </div>
  );
}
