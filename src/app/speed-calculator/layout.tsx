import { Metadata } from "next";
import Page from "./page";

export const metadata: Metadata = {
  title: "alculateur d’Allure Running – Optimisez vos performances",
  description:
    "Utilisez notre calculateur d’allure pour trouver l’allure parfaite pour vos courses à pied et atteignez vos objectifs sportifs.",
};

export default function PageLayout() {
  return <Page />;
}
