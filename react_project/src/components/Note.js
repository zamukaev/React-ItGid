import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import env from '../env.json';

function Note() {

	let { noteURL } = useParams();
	const [noteText, setNoteText] = useState('');
	const [lineClass, setLineClass] = useState('hide');
	const [formClass, setformClass] = useState('hide');
	const [errorClass, setErrorClass] = useState('hide');
	useEffect(() => {
		if (noteURL !== undefined) {
			fetch(env.urlbackend, {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: JSON.stringify({ "url": noteURL })
			})
				.then(response => response.json())
				.then(response => {
					if (response.result) {
						setNoteText(response.note);
						setLineClass('');
						setformClass('hide');
						setErrorClass('hide');

					}
					else {
						setLineClass('hide');
						setformClass('hide');
						setErrorClass('');

					}
				})
		} else {
			setLineClass('hide');
			setformClass('');
			setErrorClass('hide');
		}

	}, [noteURL]);
	const getNote = (event) => {
		event.preventDefault();
		let url = event.target.elements.url.value;
		url = url.trim();
		if (url === '') {
			alert('Заполните поля!!!');
			return false;
		}
		noteURL = url;
		console.log(window.location.href)
		window.location.href = env.url + "/" + url;

	}
	const searchNote = () => {
		window.location.href = env.url;
	}

	return (
		<div className="row">
			<div className="col-12">
				<div className="text">
					<form action="" onSubmit={getNote} className={formClass}>
						<div className="form-group">
							<label htmlFor="url">Введите hash заметки</label>
							<input type="text" name="url" id="url" className="form-control" />
						</div>
						<div className="form-group text-right">
							<button type="submit" className="btn btn-primary">Искать Note</button>
						</div>
					</form>
				</div>
				<div className={lineClass}>
					<div className="alert alert-success" role="alert">
						<h4 className="alert-heading">Note: {noteURL}</h4>
						<div>{noteText}</div>
						<hr />
						<p className="mb-0">Внимание! Скопируйте заметку. После показа заметка будет удалена!</p>
					</div>
					<div className="text-right"><button onClick={searchNote} className="btn btn-primary">Искать другой note</button></div>
				</div>
				<div className={errorClass}>
					<div className="alert alert-danger" role="alert">
						Note с таким hash не найден!
					</div>
					<div className="text-right"><button onClick={searchNote} className="btn btn-primary">Искать другой note</button></div>
				</div>
			</div>
		</div >
	);
}

export default Note;