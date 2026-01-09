from django.db import models
from django.utils import timezone
from users.models import User

class SiteDetail(models.Model):
    CATEGORY_CHOICES = (
        ('residential', 'Residential'),
        ('commercial', 'Commercial'),
        ('interior', 'Interior'),
        ('renovation', 'Renovation')
    )
    title = models.CharField(max_length=200)
    region = models.CharField(max_length=200, blank=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='residential')
    description = models.TextField(blank=True)
    team_leader = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='sites')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'projects_sitedetail'
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class Project(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('on_hold', 'On Hold')
    )
    
    site = models.ForeignKey(SiteDetail, on_delete=models.CASCADE, related_name='projects')
    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects')
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    start_date = models.DateField(null=True, blank=True)
    estimated_completion = models.DateField(null=True, blank=True)
    actual_completion = models.DateField(null=True, blank=True)
    budget = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    progress = models.PositiveIntegerField(default=0)  # percentage
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='pending')
    description = models.TextField(blank=True)
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'projects_project'
        ordering = ['-created_at']

    def __str__(self):
        return self.name

class ProjectImage(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='projects/')
    caption = models.CharField(max_length=200, blank=True)
    is_before = models.BooleanField(default=False)
    is_after = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'projects_projectimage'
        ordering = ['order']

    def __str__(self):
        return f"{self.project.name} - {self.caption}"

class SitePlan(models.Model):
    site = models.ForeignKey(SiteDetail, on_delete=models.CASCADE, related_name='plans')
    plan_name = models.CharField(max_length=200)
    plan_type = models.CharField(max_length=50, help_text="e.g., Architectural, Structural, Electrical")
    file = models.FileField(upload_to='site_plans/')
    description = models.TextField(blank=True)
    version = models.CharField(max_length=20, default='1.0')
    is_current = models.BooleanField(default=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'projects_siteplan'
        ordering = ['-uploaded_at']

    def __str__(self):
        return f"{self.site.title} - {self.plan_name}"

class SiteTracker(models.Model):
    site = models.ForeignKey(SiteDetail, on_delete=models.CASCADE, related_name='trackers')
    supervisor = models.ForeignKey('employees.Supervisor', on_delete=models.SET_NULL, null=True, blank=True)
    date = models.DateField()
    work_description = models.TextField()
    progress_percentage = models.PositiveIntegerField(default=0)
    expenses = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    labour_count = models.PositiveIntegerField(default=0)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'projects_sitetracker'
        ordering = ['-date']

    def __str__(self):
        return f"{self.site.title} - {self.date}"
