import React, { useState } from "react";
import { Button } from "./ui/button";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type Status = {
  name: string;
  editable: boolean; // Indique si le statut est modifiable
};

export function Modal({ isOpen, onClose }: ModalProps): JSX.Element | null {
  const [statuses, setStatuses] = useState<Status[]>([
    { name: "contacté(e)", editable: false },
    { name: "à contacter", editable: false },
    { name: "non retenu(e)", editable: false },
  ]);
  const [newStatus, setNewStatus] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // Indique quel statut est en cours d'édition
  const [editingValue, setEditingValue] = useState("");

  if (!isOpen) return null;

  const handleAddStatus = () => {
    if (newStatus.trim() !== "") {
      setStatuses([...statuses, { name: newStatus, editable: true }]);
      setNewStatus(""); // Réinitialise l'input après ajout
    }
  };

  const handleEditStatus = (index: number) => {
    setEditingIndex(index);
    setEditingValue(statuses[index].name); // Préremplit l'input avec la valeur actuelle
  };

  const handleSaveEdit = (index: number) => {
    const updatedStatuses = [...statuses];
    updatedStatuses[index].name = editingValue;
    setStatuses(updatedStatuses);
    setEditingIndex(null);
    setEditingValue("");
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditingValue("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-bold">Gérer mes statuts</h2>
        <p className="text-sm text-gray-500">
          Personnalisez votre expérience sur Kalent en éditant les étapes de
          votre recrutement.
        </p>

        {/* Liste des statuts */}
        <div className="mt-4 space-y-2">
          {statuses.map((status, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md"
            >
              {editingIndex === index ? (
                <input
                  type="text"
                  value={editingValue}
                  onChange={(e) => setEditingValue(e.target.value)}
                  className="w-full mr-2 border rounded-md px-2 py-1 text-sm"
                />
              ) : (
                <span
                  className={`text-sm font-medium ${
                    !status.editable ? "text-gray-500" : ""
                  }`}
                >
                  {status.name}
                </span>
              )}
              {status.editable ? (
                editingIndex === index ? (
                  <div className="flex items-center space-x-2">
                    <button
                      className="text-green-600 hover:text-green-800"
                      onClick={() => handleSaveEdit(index)}
                    >
                      ✓
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={handleCancelEdit}
                    >
                      ✗
                    </button>
                  </div>
                ) : (
                  <button
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => handleEditStatus(index)}
                  >
                    ✎
                  </button>
                )
              ) : (
                <span className="text-xs text-gray-400 italic">
                  (non modifiable)
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Input pour ajouter un nouveau statut */}
        <div className="mt-4">
          <label htmlFor="new-status" className="block text-sm font-medium">
            Nouveau statut
          </label>
          <input
            id="new-status"
            type="text"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
            placeholder="Entrez un nouveau statut"
          />
        </div>

        {/* Boutons */}
        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
          <Button onClick={handleAddStatus}>Ajouter</Button>
        </div>
      </div>
    </div>
  );
}
