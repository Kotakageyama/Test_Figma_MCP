.PHONY: tools

tools:
	@echo "Installing development tools..."
	@echo "Installing nvm (Node Version Manager)..."
	@curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
	
	@echo "Installing uv (Python package installer)..."
	@curl -LsSf https://astral.sh/uv/install.sh | sh

	@echo "Please restart your terminal or run 'source ~/.bashrc'"
	@echo "Please run nvm install && nvm use"
	@echo "Tools installation completed."
