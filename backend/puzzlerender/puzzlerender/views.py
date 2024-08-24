from django.http import HttpResponse

def home(request):
    html_content = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Puzzle Render/title>
    </head>
    <body>
        <h1>Welcome to Puzzle Render!</h1>
        <p>This is an example of rendering HTML directly from a view.</p>
    </body>
    </html>
    """
    return HttpResponse(html_content)
