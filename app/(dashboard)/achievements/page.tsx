"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BarVariant } from "@/components/bar-reserve-variant";

interface Goal {
  id: number;
  title: string;
  totalValue: number;
  addedValue: number;
  imageUrl: string;
}

interface Reserve {
  amount: number;
  date: string;
}

const goals: Goal[] = [
  {
    id: 1,
    title: "Carro Novo",
    totalValue: 50000,
    addedValue: 30000,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdrrCXITt7B50cUgy8nY-7D7z5bDR0ioovvA&s",
  },
  {
    id: 2,
    title: "Casa Própria",
    totalValue: 250000,
    addedValue: 87500,
    imageUrl:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/340405839.jpg?k=50272314a6d39fc556a3ce47a039bb3fbae2470d361136aea5532349a24aa8a7&o=&hp=1",
  },
  {
    id: 3,
    title: "PlayStation 5",
    totalValue: 4500,
    addedValue: 3600,
    imageUrl:
      "https://s.zst.com.br/cms-assets/2024/10/capa-ps5-vs-ps5-slim-vs-ps5-pro.webp",
  },
  {
    id: 4,
    title: "Cadeira e Mesa",
    totalValue: 1500,
    addedValue: 750,
    imageUrl:
      "https://cdn.leroymerlin.com.br/products/conjunto_mesa_gamer_pelegrin_pel_002p_preta_e_cadeira_gamer_p_1567745964_fdeb_600x600.jpg",
  },
];

const reserves: Reserve[] = [
  { date: "2025-01-25", amount: 500 },
  { date: "2025-02-25", amount: 400 },
  { date: "2025-03-25", amount: 300 },
  { date: "2025-05-25", amount: 100 },
  { date: "2025-08-25", amount: 650 },
  { date: "2025-09-25", amount: 250 },
  { date: "2025-10-25", amount: 380 },
];

const AchievementsPage = () => {
  useEffect(() => {
    document.title = "Monetize - Metas";
  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto -mt-24 pb-10 w-full">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Metas</CardTitle>
          <Button size="sm">
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex">
            {/* Coluna maior */}
            <div className="flex-1 pr-4">
              <h1>Ecônomias</h1>
              
              <BarVariant data={reserves} />
            </div>

            {/* Coluna menor */}
            <div className="w-1/3">
              <h1>Metas e Investimentos</h1>
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-2 gap-4">
                {goals.map((goal) => (
                  <GoalCard key={goal.id} goal={goal} />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const GoalCard = ({ goal }: { goal: Goal }) => {
  const progress = (goal.addedValue / goal.totalValue) * 100;

  return (
    <Card className="border cursor-pointer flex flex-col items-center text-center">
      <div
        className="w-full h-40 rounded-md shadow-md"
        style={{
          backgroundImage: `url(${goal.imageUrl})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {/* Conteúdo adicional da div (se necessário) */}
      </div>

      <div className="py-4">
        <h3 className="text-lg font-semibold">{goal.title}</h3>
        <p className="text-sm text-gray-500 mt-1">
          R$ {goal.addedValue.toLocaleString()} de R${" "}
          {goal.totalValue.toLocaleString()}
        </p>
        <Progress value={progress} className="w-full mt-2" />
        <p className="text-sm text-gray-500 mt-1">
          {progress.toFixed(0)}% completo
        </p>
      </div>
    </Card>
  );
};

export default AchievementsPage;
