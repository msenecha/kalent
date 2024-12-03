import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Modal } from "./Modal";

type Candidate = {
  name: string;
  location: string;
  position: string;
  employer: string;
  status: string;
};

type CandidateTableProps = {
  candidates: Candidate[];
};

export default function CandidateTable({ candidates }: CandidateTableProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );

  const handleOpenModal = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCandidate(null);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Localisation</TableHead>
            <TableHead>Poste</TableHead>
            <TableHead>Employeur</TableHead>
            <TableHead>Statut</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates.map((candidate, index) => (
            <TableRow key={index}>
              <TableCell>{candidate.name}</TableCell>
              <TableCell>{candidate.location}</TableCell>
              <TableCell>{candidate.position}</TableCell>
              <TableCell>{candidate.employer}</TableCell>
              <TableCell>
                <Button variant="outline" onClick={() => handleOpenModal(candidate)}>
                  {candidate.status}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isModalOpen && selectedCandidate && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        </Modal>
      )}
    </>
  );
}
