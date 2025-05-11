import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ExchangeRate {
  currency: string;
  krwRate: number;
  date: string;
  change: number;
  changePercent: number;
}

interface ExchangeRateState {
  rates: ExchangeRate[];
  setRates: (rates: ExchangeRate[]) => void;
  getRateFor: (currency: string) => ExchangeRate | undefined;
  convert: (amount: number, fromCurrency: string, toCurrency: string) => number | null;
}

export const useExchangeRateStore = create<ExchangeRateState>()(
  persist(
    (set, get) => ({
      rates: [],
      setRates: (rates) => set({ rates }),
      getRateFor: (currency) => {
        const { rates } = get();
        return rates.find((rate) => rate.currency === currency);
      },
      convert: (amount, fromCurrency, toCurrency) => {
        const { rates } = get();

        if (fromCurrency === toCurrency) return amount;

        // KRW -> 외화
        if (fromCurrency === "KRW") {
          const toRate = rates.find((r) => r.currency === toCurrency);
          if (!toRate) return null;
          return amount / toRate.krwRate;
        }

        // 외화 -> KRW
        if (toCurrency === "KRW") {
          const fromRate = rates.find((r) => r.currency === fromCurrency);
          if (!fromRate) return null;
          return amount * fromRate.krwRate;
        }

        // 외화 -> 외화
        const fromRate = rates.find((r) => r.currency === fromCurrency);
        const toRate = rates.find((r) => r.currency === toCurrency);
        if (!fromRate || !toRate) return null;

        const krwAmount = amount * fromRate.krwRate;
        return krwAmount / toRate.krwRate;
      },
    }),
    {
      name: "exchange-rate-storage",
      version: 1,
    }
  )
);
