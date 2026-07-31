.PHONY: install test pipeline dev

install:
	pip install -r n100/requirements.txt
	cd frontend && npm install

test:
	cd n100 && pytest tests/ -v

pipeline:
	python n100/run_pipeline.py

dev:
	cd frontend && npm run dev
