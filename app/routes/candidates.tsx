import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node"; // Utilisation correcte de Remix pour gérer les réponses JSON
import type { LoaderFunction } from "@remix-run/node";
import CandidateTable from "../components/CandidateTable";
import prisma from "~/lib/prisma";


type Candidate = {
  name: string;
  location: string;
  position: string;
  employer: string;
  status: string;
};

export const loader = async () => {
  const candidates = await prisma.candidate.findMany();
  return candidates;
};

export default function CandidatesRoute() {
  // Typage explicite des données retournées par le loader
  const candidates = useLoaderData<Candidate[]>();

  console.log("Candidates received in route component:", candidates); // Débogage

  return (
    <div className="w-3/4">
      <h1 className="text-2xl font-bold mb-4">Liste des candidats</h1>
      {/* Passe les données au composant CandidateTable */}
      <CandidateTable candidates={candidates} />
    </div>
  );
}
