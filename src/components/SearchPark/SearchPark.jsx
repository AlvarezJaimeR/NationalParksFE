import React, { useEffect, useState } from "react";
import { useAppContext } from "../../libs/contextLib";
import axios from "axios";
import useForm from "../UseForm/UseForm";

const SearchPark = () => {
	const { values, handleChange, handleSubmit, clearValues } =
		useForm(submitSearch);
	const { parks, setParks } = useAppContext();
	const [search, setSearch] = useState(false);

	function submitSearch() {
		setSearch(true);
	}

	return (
		<div>
			<div className="post-form">
				<form onSubmit={handleSubmit}>
					<div className="input-group mb-3">
						<textarea
							name="text"
							type="text"
							cols="10"
							rows="1"
							className="form-control"
							placeholder="Type away!"
							aria-label="Post time"
							aria-describedby="post-button"
							onChange={handleChange}
							value={values.text || ""}
						/>
						<button
							className="btn btn-outline-dark"
							type="submit"
							id="post-button">
							Search!
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SearchPark;
