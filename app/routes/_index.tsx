import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div>
      <Link to="/candidates">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Voir les candidats
            </button>
      </Link>
    </div>
  );
}
