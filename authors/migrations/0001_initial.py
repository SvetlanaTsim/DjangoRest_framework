# Generated by Django 4.0.2 on 2022-02-22 13:16

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Author',
            fields=[
                ('uid', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('first_name', models.CharField(max_length=64)),
                ('last_name', models.CharField(max_length=64)),
                ('birthday_year', models.PositiveIntegerField()),
            ],
            options={
                'verbose_name': 'автор',
                'verbose_name_plural': 'авторы',
            },
        ),
    ]
