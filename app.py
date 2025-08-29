from flask import Flask, request, jsonify
import google.generativeai as genai
import sympy as sp
import os

app = Flask(__name__)

# Configure the Gemini API key
# The API key is expected to be set as an environment variable.
# For local development, you can set it in your shell, for example:
# export GOOGLE_API_KEY='your_api_key'
genai.configure(api_key=os.environ.get("GOOGLE_API_KEY"))

# Initialize the Gemini model
model = genai.GenerativeModel('gemini-pro')

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_input = data.get('message', '')

    if not user_input:
        return jsonify({"error": "No message provided"}), 400

    # Basic mathematical query detection
    # This is a simple check. A more robust solution would use NLP to understand the user's intent.
    is_math_query = any(kw in user_input.lower() for kw in ['solve', 'integral', 'derivative', 'calculate', 'what is'])

    if is_math_query:
        try:
            # Use SymPy to evaluate the mathematical expression
            # For security, it's better to parse and validate the expression rather than using eval
            expr = sp.sympify(user_input.replace('solve', '').replace('integral of', '').strip(), evaluate=True)

            # If the expression is an integral, solve it
            if 'integral' in user_input.lower():
                x = sp.symbols('x') # Assume 'x' is the variable of integration
                solution = sp.integrate(expr, x)
            else:
                solution = expr.doit() if hasattr(expr, 'doit') else expr


            # Format the solution in LaTeX
            latex_solution = sp.latex(solution)

            response_text = f"The solution is: $$ {latex_solution} $$"
            return jsonify({"response": response_text})

        except (sp.SympifyError, SyntaxError) as e:
            # If SymPy fails, fall back to the Gemini API
            pass
        except Exception as e:
            return jsonify({"error": f"An error occurred: {str(e)}"}), 500


    # If it's not a math query or if SymPy fails, use the Gemini API
    try:
        response = model.generate_content(user_input)
        return jsonify({"response": response.text})
    except Exception as e:
        return jsonify({"error": f"Error with Gemini API: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
