from django.urls import path
from . import views

urlpatterns = [
	path('token', views.token, name='token'),
	path('user', views.user, name='user'),
	path('user/<int:id>', views.user_detail, name='user_detail'),
	path('user/wins/<int:id>', views.user_wins, name='user_wins'),
	path('user/rank', views.rank, name='user_rank'),
	path('sign_in', views.sign_in, name='sign_in'),
	path('sign_out', views.sign_out, name='sign_out'),
	path('user/rank', views.rank, name='rank'),
	path('user/room/<int:id>', views.user_room, name = 'user_room'),
	path('room', views.room, name='room'),
	path('room/<int:id>', views.room_detail, name='room_detail'),
	path('room/<int:id>/user', views.room_user, name='room_user'),
	path('room/<int:id>/user/<int:user_id>', views.room_user_detail, name='room_user_detail'),
	path('tournament', views.tournament, name='tournament'),
	path('tournament/<int:id>', views.tournament_detail, name='tournament_detail'),
	path('team', views.team, name='team'),
	path('team/<int:id>', views.team_detail, name='team_detail')
]
