'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@shadcn/ui";
import { CogIcon } from "@heroicons/react/outline"; // O cualquier otro ícono de tu preferencia

export function PomodoroTimer() {
  const [timer, setTimer] = useState<number>(25 * 60); // Tiempo del pomodoro en segundos (25 minutos)
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isBreak, setIsBreak] = useState<boolean>(false); // Determina si estamos en pausa
  const [breakTime, setBreakTime] = useState<number>(5 * 60); // Tiempo de la pausa corta en segundos (5 minutos)
  const [longBreakTime, setLongBreakTime] = useState<number>(15 * 60); // Tiempo de la pausa larga en segundos (15 minutos)
  const [cycles, setCycles] = useState<number>(4); // Número de ciclos antes de la pausa larga
  const [cycleCount, setCycleCount] = useState<number>(0); // Contador de ciclos

  // Configuración de la pausa corta
  const [shortBreakCount, setShortBreakCount] = useState<number>(0); // Número de pausas cortas tomadas

  // Estado para el dialog
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  // Función para ajustar el tiempo del temporizador
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const timeInSeconds = parseInt(value) * 60;

    switch (name) {
      case 'pomodoro':
        setTimer(timeInSeconds);
        break;
      case 'shortBreak':
        setBreakTime(timeInSeconds);
        break;
      case 'longBreak':
        setLongBreakTime(timeInSeconds);
        break;
      default:
        break;
    }
  };

  // Función para ajustar el número de ciclos
  const handleCycleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCycles(Number(e.target.value));
  };

  // Función para iniciar o pausar el temporizador
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  // Función para reiniciar el temporizador
  const resetTimer = () => {
    setIsRunning(false);
    setTimer(25 * 60);
    setBreakTime(5 * 60);
    setLongBreakTime(15 * 60);
    setCycleCount(0);
    setShortBreakCount(0);
  };

  // Función para gestionar la lógica del temporizador
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null; // Definir el intervalo como null inicialmente

    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 0) {
            // Si se llega a cero, alternar entre pomodoro y pausa
            if (isBreak) {
              if (shortBreakCount + 1 >= cycles) {
                setIsBreak(false); // Pausa larga
                setCycleCount(0); // Reiniciar el contador de ciclos
                return longBreakTime;
              } else {
                setShortBreakCount(shortBreakCount + 1);
                setIsBreak(false); // Pausa corta
                return timer;
              }
            } else {
              setIsBreak(true); // Inicia la pausa
              setCycleCount(cycleCount + 1);
              return breakTime;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval); // Limpiar el intervalo si el temporizador no está corriendo
    }

    return () => {
      if (interval) {
        clearInterval(interval); // Limpiar el intervalo al desmontar
      }
    };
  }, [isRunning, timer, breakTime, longBreakTime, cycles, isBreak, cycleCount, shortBreakCount]);

  // Función para convertir los segundos a minutos y segundos
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <Card className="bg-zinc-900">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg lg:text-xl text-white">Pomodoro Timer</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="text-white">
              <CogIcon className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[400px] p-6 bg-white rounded-lg">
            <DialogHeader>
              <DialogTitle>Settings</DialogTitle>
              <DialogDescription>
                Ajusta los tiempos y el número de ciclos antes de la pausa larga.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4">
              <label className="text-black">Pomodoro Duration (min)</label>
              <input
                type="number"
                name="pomodoro"
                value={timer / 60}
                onChange={handleTimeChange}
                className="ml-2 text-black"
                min={1}
              />
            </div>
            <div className="mt-4">
              <label className="text-black">Short Break Duration (min)</label>
              <input
                type="number"
                name="shortBreak"
                value={breakTime / 60}
                onChange={handleTimeChange}
                className="ml-2 text-black"
                min={1}
              />
            </div>
            <div className="mt-4">
              <label className="text-black">Long Break Duration (min)</label>
              <input
                type="number"
                name="longBreak"
                value={longBreakTime / 60}
                onChange={handleTimeChange}
                className="ml-2 text-black"
                min={1}
              />
            </div>
            <div className="mt-4">
              <label className="text-black">Cycles before Long Break</label>
              <input
                type="number"
                value={cycles}
                onChange={handleCycleChange}
                className="ml-2 text-black"
                min={1}
              />
            </div>

            <div className="mt-6 flex justify-end">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="text-center">
        <h2 className="text-white text-xl">{isBreak ? "Break Time" : "Pomodoro Time"}</h2>
        <div className="text-white text-4xl mt-4">
          {formatTime(timer)}
        </div>

        <div className="mt-4">
          <Button variant="outline" onClick={toggleTimer}>
            {isRunning ? "Pause" : "Start"}
          </Button>
        </div>

        <div className="mt-4">
          <Button variant="outline" onClick={resetTimer}>
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
