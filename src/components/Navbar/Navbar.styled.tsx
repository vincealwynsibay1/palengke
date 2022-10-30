import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../../app/firebase";
import { useAuthContext } from "../../hooks/useAuthContext";
import Wrapper from "../Layout/Wrapper";
import Search from "../Search/Search";
import NavLinks from "./NavLinks";
import NavMenu from "./NavMenu";

interface Props {}

const Nav = styled.nav`
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: relative;
	z-index: 1;
	margin-bottom: 1rem;
`;

const NavBrand = styled(Link)`
	font-size: 1.5rem;
	color: #1dbe74;
	font-weight: 700;
	transition: background-color 0.2s ease-in-out;
	:hover {
		color: #1cb66e;
	}
`;

const NavToggle = styled.div`
	cursor: pointer;
	display: flex;
	z-index: 1;
	flex-direction: column;
	gap: 0.25rem;
	@media screen and (min-width: 48rem) {
		display: none;
	}
`;

const NavSpan = styled.span`
	display: block;
	width: 1.5625rem;
	height: 0.3125rem;
	background-color: #000;
`;

const SearchBar = styled(Search)`
	display: none;
	@media screen and (min-width: 48rem) {
		display: initial;
	}
`;

function Navbar({}: Props) {
	const { user } = useAuthContext();
	const [toggle, setToggle] = useState(false);

	return (
		<Wrapper>
			<Nav>
				<NavBrand to='/'>Palengke</NavBrand>

				<NavToggle onClick={() => setToggle(!toggle)}>
					<NavSpan />
					<NavSpan />
					<NavSpan />
				</NavToggle>

				<SearchBar className='' />

				<NavLinks />
				<NavMenu toggle={toggle} />
			</Nav>
		</Wrapper>
	);
}

export default Navbar;
