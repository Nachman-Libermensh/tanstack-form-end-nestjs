"use client";

import { useState } from "react";
import { Button } from "rizzui";
import UserForm from "@/_components/forms/user-form/user-form";
import Popup from "@/_components/Popup";
import { useModal } from "@/_components/modal-views/use-modal";

export default function Home() {
  const { openModal, closeModal } = useModal();
  const [, setModalType] = useState<string | null>(null);

  // פונקציה משופרת לפתיחת טופס הרשמה
  const handleOpenRegisterModal = () => {
    console.log("מנסה לפתוח את טופס ההרשמה");
    setModalType("register");
    openModal({
      view: (
        <Popup
          title="הרשמת משתמש חדש"
          onClose={() => {
            closeModal();
            setModalType(null);
          }}
        >
          <div className="bg-white p-4 rounded">
            <UserForm
              onClose={() => {
                closeModal();
                setModalType(null);
              }}
              showHeader={false}
            />
          </div>
        </Popup>
      ),
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
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={handleOpenRegisterModal}
          size="lg"
          className="px-8"
          variant="solid"
        >
          פתח טופס הרשמה
        </Button>
      </div>
    </main>
  );
}
