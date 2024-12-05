"use client";

import { Bell, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useState, useEffect } from 'react'

export function Header() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Solo se ejecuta en el cliente
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente

  return (
    <header className="bg-zinc-900 p-4 flex justify-between items-center">
      <h1 className="text-xl lg:text-2xl font-bold text-white">
        Welcome {username ? username : 'Guest'}!
      </h1>
      <div className="flex items-center space-x-2 lg:space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5 text-zinc-400" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5 text-zinc-400" />
        </Button>
      </div>
    </header>
  );
}
