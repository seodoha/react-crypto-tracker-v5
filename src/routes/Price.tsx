import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface PriceProps {
    coinId: string;
}

interface IHistorical {
    time_open: number;
    time_close: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

function Price({ coinId }: PriceProps) {
    const isDark = useRecoilValue(isDarkAtom);
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId), {
        refetchInterval: 10000,
    });
    const exceptData = data ?? [];
    return (
        <div>
            {isLoading ? (
                "Loading chart....."
            ) : (
                <ApexChart
                    type="candlestick"
                    series={[
                        {
                            data: exceptData?.map((price) => [
                                new Date(price.time_open).getTime(), // 날짜
                                price.open, // 시작가
                                price.high, // 최고가
                                price.low, // 최저가
                                price.close, // 종가
                            ]),
                        },
                    ]}
                    options={{
                        theme: {
                            mode: isDark ? "dark" : "light",
                        },
                        chart: {
                            height: 300,
                            width: 300,
                            toolbar: { show: false },
                            background: "transparent",
                        },
                        xaxis: {
                            type: "datetime",
                            labels: { show: false },
                            axisBorder: { show: false },
                            axisTicks: { show: false },
                            categories: data?.map((price) => new Date(price.time_close * 1000).toISOString()),
                        },
                        yaxis: { show: false },
                        grid: { show: false },
                        plotOptions: {
                            candlestick: {
                                colors: {
                                    upward: "#DF7D46", // 상승 시 색상
                                    downward: "#3C90EB", // 하락 시 색상
                                },
                            },
                        },
                    }}
                />
            )}
        </div>
    );
}

export default Price;
