import { FaGreaterThan } from "react-icons/fa6";

interface Props {
    params: { collectionName: string };
}

// Mark the function as async to properly await params.
const CollectionPage = async ({ params: {collectionName} }: Props) => {
    return (
        <div className="happy-page">
            <div className="happy-title-head flex items-center gap-2">
                <h1>Collection</h1>
                <FaGreaterThan size={16} />
                <span>{collectionName}</span>
            </div>
        </div>
    );
};

export default CollectionPage;
