import Link from 'next/link';

const HomePage = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <Link href={`/editCharacter?id=batman`}>
                <a>Edit Batman Character</a>
            </Link>
        </div>
    );
};

export default HomePage;
