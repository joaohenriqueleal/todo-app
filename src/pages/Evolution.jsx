import { useEffect, useState } from "react"

import { FiArrowUp, FiArrowDown } from "react-icons/fi"

import loadActualUser from "../shared/actual-user/loadActualUser"
import timestampToDayMonth from "../utils/timestampToDayMonth"
import loadDays from "../shared/days/loadDays"

import HeaderEvolution from "../components/layout/HeaderEvolution"
import NavBar from "../components/layout/NavBar"

export default function Evolution() {
    const [actualUser, setActualUser] = useState(null)
    const [days, setDays] = useState([])
    const [period, setPeriod] = useState("7d");

    const computeMeanDaysScores = () => {
        if (!days.length) return 0
        return days.reduce((acc, d) => acc + d.scores, 0) / days.length
    };

    const getBestDay = () => {
        if (!days.length) return "—"
        const best = days.reduce((a, b) => (b.scores >= a.scores ? b : a))
        return `${timestampToDayMonth(best.time)} — ${best.scores} EXP`
    };

    const getBadDay = () => {
        if (!days.length) return "—"
        const worst = days.reduce((a, b) => (b.scores <= a.scores ? b : a))
        return `${timestampToDayMonth(worst.time)} — ${worst.scores} EXP`
    };

    const filterByPeriod = () => {
        if (!days.length) return []

        let count = 7
        if (period === "1m") count = 30
        if (period === "1a") count = 365

        const startIndex = Math.max(days.length - count, 0)
        return days.slice(startIndex)
    };

    const meanPeriod = () => {
        const filtered = filterByPeriod()
        if (!filtered.length) return 0
        return filtered.reduce((acc, d) => acc + d.scores, 0) / filtered.length
    };

    const meanGeneral = computeMeanDaysScores()
    const diff = meanPeriod() - meanGeneral
    const isFalling = diff < 0

    useEffect(() => {
        const user = loadActualUser()
        if (user) {
            setActualUser(user)
            setDays(loadDays(user))
        }
    }, [])

    return (
        <>
            <HeaderEvolution days={days} />

            <main className="p-4 pb-24 max-w-200 mx-auto w-full">
                {days.length > 0 && (
                    <section
                        className="
                            p-5 rounded-2xl 
                            bg-sky-100 
                            shadow-md 
                            border border-sky-200
                            space-y-6
                        "
                    >
                        <div className="anim-from-left">
                            <h1 className="text-xl font-semibold text-sky-900">
                                Média geral de EXP por dia:
                            </h1>
                            <p className="text-3xl font-bold text-sky-700">
                                {meanGeneral.toFixed(1)}
                            </p>
                        </div>

                        <div className="h-px bg-sky-300/50 rounded-full" />
                        <div className="anim-from-left">
                            <h1 className="text-xl font-semibold text-sky-900">
                                Melhor dia:
                            </h1>
                            <p className="text-2xl font-bold text-sky-700 flex items-center gap-2">
                                {getBestDay()} <span className="text-lg">🔥</span>
                            </p>
                        </div>
                        <div className="anim-from-left">
                            <h1 className="text-xl font-semibold text-sky-900">
                                Pior dia:
                            </h1>
                            <p className="text-2xl font-bold text-sky-700 flex items-center gap-2">
                                {getBadDay()} <span className="text-lg">😴</span>
                            </p>
                        </div>

                        <div className="h-px bg-sky-300/50 rounded-full" />
                        <div className="anim-from-left">
                            <h1 className="text-xl font-semibold text-sky-900">
                                Desempenho recente (últimos dias):
                            </h1>
                            <div className="flex gap-2 mt-2">
                                {["7d", "1m", "1a"].map(p => (
                                    <button
                                        key={p}
                                        onClick={() => setPeriod(p)}
                                        className={`
                                            px-3 py-1 rounded-lg text-sm font-semibold
                                            transition-all
                                            ${period === p
                                                ? "bg-sky-300 text-sky-900 border border-sky-400"
                                                : "bg-sky-200 text-sky-700"
                                            }
                                        `}
                                    >
                                        {p.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center gap-2 mt-3">
                                {isFalling ? (
                                    <>
                                        <FiArrowDown className="text-red-600 text-3xl" />
                                        <p className="text-lg font-semibold text-red-700">
                                            Você está {Math.abs(diff).toFixed(1)} EXP abaixo da média.
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <FiArrowUp className="text-green-600 text-3xl" />
                                        <p className="text-lg font-semibold text-green-700">
                                            {diff.toFixed(1)} EXP acima da média!
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </section>
                )}
                {days.length === 0 && (
                    <p className="text-center text-sky-900 mt-6 text-lg">
                        Nenhum registro ainda. Complete tarefas para gerar sua evolução 📈
                    </p>
                )}
            </main>
            <NavBar />
        </>
    )
}
