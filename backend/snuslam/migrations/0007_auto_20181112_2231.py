# Generated by Django 2.1.1 on 2018-11-12 22:31

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('snuslam', '0006_auto_20181112_2228'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='UserInfo',
            new_name='Profile',
        ),
    ]