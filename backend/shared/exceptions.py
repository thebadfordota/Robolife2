class NotFoundValueError(ValueError):
    ...


class CommandError(Exception):
    ...


class MethodIsForbiddenError(Exception):

    def __str__(self):
        return 'Данный метод запрещён'


class IncorrectParametersError(Exception):
    ...
