# Generated by Django 2.1.1 on 2018-11-05 05:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('snuslam', '0002_remove_tournament_max_team'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tournament',
            name='admin_approval',
        ),
    ]
