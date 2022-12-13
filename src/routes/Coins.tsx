import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./../api";

const Container = styled.div`
    max-width: 480px;
    padding: 20px;
    margin: 0 auto;
`;

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10vh;
    margin-bottom: 40px;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: ${(props) => props.theme.cardBgColor};
    color: ${(props) => props.theme.textColor};
    margin-bottom: 10px;
    border-radius: 15px;
    border: 1px solid white;
    a {
        display: flex;
        align-items: center;
        padding: 20px;
        transition: color 0.2s ease-in;
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.div`
    text-align: center;
`;

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;

interface ICoin {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

interface ICoinsProps {}

function Coins({}: ICoinsProps) {
    const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);
    // const [coins, setCoins] = useState<ICoin[]>([]);
    // const [loading, setloading] = useState(true);
    // useEffect(() => {
    //     (async () => {
    //         const response = await fetch("https://api.coinpaprika.com/v1/coins");
    //         const json = await response.json();
    //         setCoins(json.slice(0, 100));
    //         setloading(false);
    //     })();
    // }, []);
    // const setDarkAtom = useSetRecoilState(isDarkAtom);
    // const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

    return (
        <Container>
            <Helmet>
                <title>코인</title>
            </Helmet>
            <Header>
                <Title>코인</Title>
                {/* <button onClick={toggleDarkAtom}>Toggle Dark Mode</button> */}
            </Header>
            {isLoading ? (
                <Loader>"Loading...."</Loader>
            ) : (
                <CoinsList>
                    {data?.slice(0, 100).map((coin) => (
                        <Coin key={coin.id}>
                            <Link
                                to={{
                                    pathname: `/${coin.id}`,
                                    state: { name: coin.name },
                                }}
                            >
                                <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} />
                                {coin.name} &rarr;
                            </Link>
                        </Coin>
                    ))}
                </CoinsList>
            )}
        </Container>
    );
}

export default Coins;
