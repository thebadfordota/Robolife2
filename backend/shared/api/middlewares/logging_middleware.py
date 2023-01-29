import time


class RequestTimeMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        timestamp = time.monotonic()

        response = self.get_response(request)

        print(
            f'Продолжительность запроса {request.path} - '
            f'{time.monotonic() - timestamp:.3f} сек.'
        )

        return response
