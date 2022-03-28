import { useState } from "react"
import { FileUploader } from "react-drag-drop-files"
import styles from "./Form.module.css"

const fileTypes = ["PDF"]

export default function Form() {
	const [file, setFile] = useState(null)
	const [loading, setLoading] = useState(null)
	const [questions, setQuestions] = useState([])

	const handleChange = async (file) => {
		setFile(file)
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		setLoading(true)
		const data = new FormData()

		data.append("text", event.target.text.value)
		data.append("count", event.target.count.value)
		data.append("file", file)

		const url = "https://c0b9-103-177-112-191.ngrok.io/generate"
		fetch(url, {
			method: "POST",
			body: data,
		}).then((response) => {
			response.json().then((res) => setQuestions(res))
			setLoading(false)
		})
	}

	return (
		<div className="container">
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className="input-group input-group-lg">
					<textarea
						name="text"
						className={`form-control ${styles.comprehension}`}
						placeholder="Enter text..."
					></textarea>
				</div>
				<h3>OR</h3>

				<FileUploader
					handleChange={handleChange}
					name="file"
					types={fileTypes}
					multiple={false}
					classes={styles.drop_area}
				/>
				<div className={styles.input_form}>
					<label
						htmlFor="#questions"
						className="form-label"
						style={{ margin: 0.5 + "em" }}
					>
						Enter number of questions
					</label>
					<input id="#questions" type="number" name="count"></input>
				</div>

				<button className="btn btn-primary" type="submit">
					Submit form
				</button>
			</form>
			<div>
				{loading && <div>This will take some time</div>}
				{questions.length > 0 && (
					<div>
						{questions.map((question, index) => {
							{
								question = JSON.parse(question)
							}
							return (
								<div className="card mb-3" key={index}>
									<h5 className="card-header">
										Question {index + 1}
									</h5>
									<div className="card-body">
										<h6 className="card-title" key={index}>
											{" "}
											{question.questionText}
										</h6>
									</div>

									<div className="answerBox">
										<input
											type="text"
											value={question.answerText}
											className="form-control is-valid"
											id="inputValid"
											readOnly
										></input>
									</div>

									<div>
										{question.distractors.map(
											(distractor, index) => (
												<input
                                                    key={index}
													type="text"
													value={distractor}
													className="form-control is-invalid"
												></input>
											)
										)}
									</div>

									<div className="answerBox">
										<input
											type="text"
											className="form-control"
											placeholder="Add answer..."
											id="inputDefault"
										></input>
									</div>
								</div>
							)
						})}
					</div>
				)}
			</div>
		</div>
	)
}
