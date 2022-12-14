import { collection, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { db } from "../../app/firebase";
import { useQuery } from "../../hooks/useQuery";
import Filter from "../Filter/Filter";
import Wrapper from "../Layout/Wrapper";
import Loading from "../Loading/Loading";
import Search from "../Search/Search";
import ProductItem from "./ProductItem";
interface Props {}

const Container = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	grid-gap: 1rem;
`;

const SearchBar = styled(Search)`
	@media (min-width: 48rem) {
		display: none;
	}
`;
const SortFilterContainer = styled.div`
	@media (min-width: 48rem) {
		margin: 1rem 0;
	}
`;

function ProductsList({}: Props) {
	const [filter, setFilter] = useState("all");
	const [products, setProducts] = useState<any[]>([]);

	// query
	let searchQuery = useQuery();
	const queryText = searchQuery.get("query") || "";

	const [snapshot, loading, error] = useCollection(
		query(
			collection(db, "products"),
			where("name", ">=", queryText),
			where("name", "<=", queryText + "\uf8ff")
		)
	);

	useEffect(() => {
		if (!loading) {
			if (filter === "all") {
				setProducts(snapshot!.docs);
			} else if (filter !== "all") {
				const filteredProducts = snapshot!.docs.filter((product) => {
					return product.data().category === filter;
				});
				setProducts(filteredProducts);
			}
		}
	}, [loading, filter]);

	if (loading) {
		return <Loading />;
	}

	const filterList = ["all", "fruit", "vegetable", "dairy", "meat"];

	return (
		<Wrapper>
			<div className=''>
				<SortFilterContainer>
					<SearchBar className='' />
					<Filter
						list={filterList}
						value={filter}
						setFilter={setFilter}
					/>
				</SortFilterContainer>

				<Container className='products-list'>
					{products &&
						products.map((doc) => {
							return (
								<ProductItem
									key={doc.id + doc.data().data_added}
									id={doc.id}
									data={doc.data()}
								/>
							);
						})}
					{products.length === 0 && <div>No products found</div>}
				</Container>
			</div>
		</Wrapper>
	);
}

export default ProductsList;
