<?PHP

namespace App\EventSubscriber;

use App\Entity\Product;
use EasyCorp\Bundle\EasyAdminBundle\Event\AfterEntityDeletedEvent;
use EasyCorp\Bundle\EasyAdminBundle\Event\BeforeEntityPersistedEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\KernelInterface;

class EasyAdminProductIllustration implements EventSubscriberInterface
{

    private $appKernel;

    public function __construct(KernelInterface $appKernel)
    {
        $this->appKernel = $appKernel;
    }


    public static function getSubscribedEvents()
    {
        return [
            AfterEntityDeletedEvent::class => ['deleteImage'],
            //BeforeEntityPersistedEvent::class => ['setIllustration'],
        ];
    }

    public function deleteImage(AfterEntityDeletedEvent $event)
    {
        $entity = $event->getEntityInstance();
        $image = $entity->getIllustration();
        if (!($entity instanceof Product)) return;
        $imgpath = $this->appKernel->getProjectDir() . '/public/uploads/' . $image;
        if (file_exists($imgpath)) unlink($imgpath);
    }

    public function setIllustration(BeforeEntityPersistedEvent $event)
    {
        $entity = $event->getEntityInstance();
        $tmp_name = $entity->getIllustration();
        $filename = uniqid();
        $extension = pathinfo($tmp_name, PATHINFO_EXTENSION);
        $projectDir = $this->appKernel->getProjectDir();
        dd($extension);
        move_uploaded_file($tmp_name, $projectDir . '/public/uploads/' . '.' . $extension);
        $entity->setIllustration($filename . '.' . $extension);
    }
}