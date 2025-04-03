"use client";

import { Button } from "rizzui";
import { useModal } from "@/_components/modal-views/use-modal";
import dynamic from "next/dynamic";

// טעינה דינמית של המודל
const UserRegisterModal = dynamic(
  () =>
    import("@/_components/forms/user-form/user-form").then(
      (mod) => mod.default
    ),
  { ssr: false }
);

export default function Home() {
  const { openModal } = useModal();

  const handleOpenRegisterModal = () => {
    openModal({
      view: <UserRegisterModal />,
      size: "lg",
    });
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">
        ברוכים הבאים לדוגמת Tanstack Form
      </h1>
      <p className="text-gray-600 mb-8 text-center max-w-lg">
        דוגמה זו מציגה שילוב של טפסים מתקדמים עם Tanstack Form, NestJS ו-NextJS.
      </p>

      <Button onClick={handleOpenRegisterModal} size="lg" className="px-8">
        פתח טופס הרשמה
      </Button>
    </main>
  );
}
