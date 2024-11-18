"use client";

import Input from "./components/Input";
import Select from "./components/Select";
import Tabs from "./components/Tabs";
import { useCallback, useEffect, useMemo, useState } from "react";

const TAB = {
  TIME: "Temps",
  PACE: "Allure",
};

export default function Home() {
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
  const [result, setResult] = useState<{
    speed: number;
    pace: number;
    tour: number;
  }>({
    speed: 0,
    pace: 0,
    tour: 0,
  });

  const handleChangeDistance = useCallback((value: string) => {
    setDistance(+value || null);
  }, []);

  const handleChangeTime = useCallback(
    (value: string, type: "hours" | "minutes" | "secondes") =>
      setTime((time) => ({ ...time, [type]: +value })),
    []
  );

  const returnNumber = (value: number | null) => {
    return value ?? 0;
  };

  useEffect(() => {
    const secondes = returnNumber(time.secondes);
    const minutes = returnNumber(time.minutes);
    const hours = returnNumber(time.hours);
    const kilometres = returnNumber(distance) / 1000;
    const totalMinutes = minutes + hours * 60 + secondes * 36000;
    const totalHours = hours + minutes / 60 + secondes / 3600;
    const speed = totalHours === 0 ? 0 : kilometres / totalHours;
    console.log(totalMinutes, "jfdksfkj");
    setResult({
      speed: Math.round((speed || 0) * 100) / 100,
      pace: totalMinutes / kilometres || 0,
      tour: 0,
    });
  }, [distance, time.hours, time.minutes, time.secondes]);

  const renderTimeContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4 bg-run-500 rounded-b-2xl rounded-se-2xl p-8 md:flex-row">
        <div className="bg-run-100 rounded-2xl p-8">
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
        <div className="bg-run-100 rounded-2xl p-8">
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
      <div className="flex justify-between bg-run-400 rounded-b-2xl rounded-se-2xl p-8">
        <div className="flex flex-row items-center gap-2">
          <Select
            items={Array.from({ length: 60 }, (_, i) => i.toString())}
            label={""}
          />{" "}
          min
          <Select
            items={Array.from({ length: 60 }, (_, i) => i.toString())}
            label={""}
          />{" "}
          sec
        </div>
        ~ 15km/h
      </div>
    );
  }, []);

  const renderContentTab = useMemo(() => {
    const CONTENT = {
      [TAB.TIME]: renderTimeContent,
      [TAB.PACE]: renderPaceContent,
    };
    return <div className="flex flex-col gap-2">{CONTENT[selectedItem]}</div>;
  }, [renderPaceContent, renderTimeContent, selectedItem]);

  return (
    <div className="min-h-screen pb-20 gap-16 sm:px-20 sm:py-12 font-[family-name:var(--font-geist-sans)]">
      <h1 className="font-bold text-[48px] pb-12 text-run-800">
        Calculateur d’allure de course
      </h1>

      <main className="grid grid-cols-12 grid-rows-1 gap-8 w-full">
        <div className="col-span-12 md:col-span-8 flex flex-col gap-4">
          <div className="bg-run-200 rounded-2xl p-8 w-fit">
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
        <div className="bg-run-600 rounded-2xl p-4 w-full col-span-12 md:col-span-4">
          <div
            className="rounded-2xl inset-0 h-full w-full flex flex-col items-center justify-center "
            style={{
              backgroundImage:
                "linear-gradient(transparent 0%, rgb(146, 63, 14) 100%)",
            }}
          >
            <div className="flex flex-col">
              <h2>Vitesse Moyenn</h2>
              <p className="text-[36px]">{result.speed} km/h</p>
            </div>

            <div className="flex gap-12">
              <div className="flex flex-col">
                <h2>Allure</h2>{" "}
                <p className="text-[24px]">{result.pace} min/km</p>{" "}
              </div>
              <div className="flex flex-col">
                <h2>Temps par tour</h2>{" "}
                <p className="text-[24px]">{result.tour} min/tour</p>{" "}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
