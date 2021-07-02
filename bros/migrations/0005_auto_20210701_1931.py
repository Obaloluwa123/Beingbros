# Generated by Django 3.2.4 on 2021-07-02 00:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bros', '0004_auto_20210701_1134'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='followers',
            options={'verbose_name_plural': 'Followers'},
        ),
        migrations.AlterModelOptions(
            name='profile',
            options={'verbose_name_plural': 'Profiles'},
        ),
        migrations.AlterModelOptions(
            name='story',
            options={'verbose_name_plural': 'Stories'},
        ),
        migrations.AlterModelOptions(
            name='timeline',
            options={'verbose_name_plural': 'TimeLine'},
        ),
        migrations.RenameField(
            model_name='story',
            old_name='body',
            new_name='story_body',
        ),
    ]