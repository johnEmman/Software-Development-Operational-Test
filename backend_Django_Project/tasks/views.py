from rest_framework import status, viewsets
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Task
from .serializers import TaskSerializer


class TaskViewSet(viewsets.ViewSet):

    def list(self, request):
        tasks = Task.objects.all().order_by('-created_at')
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            task = serializer.save()
            return Response(TaskSerializer(task).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        task = get_object_or_404(Task, pk=pk)
        serializer = TaskSerializer(task)
        return Response(serializer.data)

    def update(self, request, pk=None):
        task = get_object_or_404(Task, pk=pk)

        task.title = request.data.get('title', task.title)
        task.description = request.data.get('description', task.description)
        task.save()

        return Response(TaskSerializer(task).data)

    def partial_update(self, request, pk=None):
        task = get_object_or_404(Task, pk=pk)

        task.completed = not task.completed
        task.save()

        return Response(TaskSerializer(task).data)

    def destroy(self, request, pk=None):
        task = get_object_or_404(Task, pk=pk)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
